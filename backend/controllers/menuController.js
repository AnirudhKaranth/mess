// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// const JWT_SECRET = 'supasecreto'
import sequelize from '../DB/db.js'; //Op reqd for '/votemenu'
import Op from 'sequelize';

import cron from 'node-cron'; //scheduler
import Menu from "../models/Menu.js"
import Food from "../models/Food.js"
import Vote from "../models/Vote.js"

// ROUTE 1: show menu items using: POST '/menu'
export const showMenu = async (req, res) => {
    try {
      const menuItems = await Menu.findAll({
        include: [
          {
            model: Food,
            attributes: ['Fname'], // Only select the 'fname' attribute from Food
          },
        ],
      });
      // Extract relevant fields from Menu and Food models
      // const menuData = menuItems.map(item => ({
      //   ...item.get(), // Include all fields from the Menu model
      //   Fname: item.Food.Fname, // Include 'fname' from the associated Food model
      // }));
      res.json(menuItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



// ROUTE 2: Vote for menu items using: POST '/votemenu'
export const voteMenu = async (req, res) => {
  try {
    let voted = false;
    const userId = req.header('userId'); // Temporary
    // const { userId } = req; // Assuming userId is available from authentication middleware
    const { votes } = req.body; // Assuming votes is an array of objects with day, timeslot, and Fid

    // Check if the user has already voted for any of the specified day and timeslot combinations
    // const existingVotes = await Vote.findAll({
    //   where: {
    //     Uid: userId,
    //     ...votes.map((vote) => {
    //       console.log({ Day: vote.day, Timeslot: vote.timeslot }); // Add this line for debugging
    //       return { Day: vote.day, Timeslot: vote.timeslot };
    //     }),
    //   },
    // });

    // if (existingVotes.length === 0) {
      // User hasn't voted for any of these day and timeslot combinations, proceed to save votes
      await Vote.bulkCreate(
        votes.map((vote) => ({
          Uid: userId,
          Mid: 1, // Assuming a constant value for Mid
          Day: vote.day,
          Timeslot: vote.timeslot,
          Fid: vote.Fid,
        }))
      );
      voted = true;
    // if(voted)
      res.json({ success: true });
    // } 
    // else {
    //   res.status(400).json({ error: 'You have already voted for one or more of these day and timeslot combinations.' });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// ROUTE 3: Function to MANUALLY update menu based on highest voted food for Saturday and Sunday using PUT '/updatemenu'
export const updateMenu = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const rankedVotes = await Vote.findAll({
        attributes: ['Day', 'Timeslot', 'Fid', [sequelize.fn('COUNT', sequelize.col('*')), 'vote_count']],
        where: {
          day: ['SATURDAY', 'SUNDAY'],
        },
        group: ['Day', 'Timeslot', 'Fid'],
        order: [[sequelize.literal('vote_count'), 'DESC']],
        raw: true,
        nest: true,
      });

      for (const vote of rankedVotes) {
        const { Day, Timeslot, Fid } = vote;
        await Menu.update({ Fid }, { where: { Day, Timeslot }, limit: 1, transaction: t });
      }

      console.log('Menu update successful');
    });
    if(res){//to avoid cron error since cron sched requires no res 
      res.status(200).json({ message: 'Menu update successful' });
    }
  } catch (err) {
    console.error('Error updating menu:', err);
    // await t.rollback(); // Rollback the transaction explicitly
    if(res){
    res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Schedule the task to run every Friday at 6 PM
// cron.schedule('31 9 * * 1', () => {
cron.schedule('0 18 * * 5', () => {
  console.log('Running the scheduled task on Friday at 6 PM...');
  updateMenu();
});


