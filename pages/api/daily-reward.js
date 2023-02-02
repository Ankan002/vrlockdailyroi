import User from '../../helper/Modal/User';
import CareerReward from '../../helper/Modal/Records/CareerReward';
import { parse, differenceInHours, subDays, format } from 'date-fns';
import { calculateRewards } from '../../helper/calculate-reward';
import { getDailyRewardLevel } from '../../helper/get-daily-reward-level';

const dailyReward = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      success: false,
      error: 'Invalid Request Method!!'
    });
  }

  const { user_id } = req.body;

  try {
    const user = await User.findById(user_id);
    const rewards = await CareerReward.find({
      user_id: user.id
    })
      .sort('-createdAt')
      .limit(1);

    if (rewards.length > 0) {
      const lastRewardTimeString = rewards[0].time_granted;
      const lastRewardTime = parse(
        lastRewardTimeString,
        'dd MM yyyy HH:mm',
        new Date()
      );

      const currentDate = new Date();

      const hourDifference = differenceInHours(currentDate, lastRewardTime);

      const totalDaysToBeGranted = hourDifference % 24;

      if (totalDaysToBeGranted <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Reward Already Granted'
        });
      }

      const eachDayRewardToBeGranted = await calculateRewards(user.id);
      const dailyReward = getDailyRewardLevel(eachDayRewardToBeGranted);

      for (let i = 0; i < totalDaysToBeGranted; i++) {
        const date = subDays(new Date(), i);
        const dateString = format(date, 'dd MM yyyy HH:mm');

        await CareerReward.create({
          user_id: user.id,
          reward_level: dailyReward.level,
          reward_granted: dailyReward.reward,
          time_granted: dateString
        });
      }

      return res.status(200).json({
        success: true
      });
    }

    const rewardToBeGranted = await calculateRewards(user.id);
    const dailyReward = getDailyRewardLevel(rewardToBeGranted);

    const dateString = format(new Date(), 'dd MM yyyy HH:mm');

    await CareerReward.create({
      user_id: user.id,
      reward_level: dailyReward.level,
      reward_granted: dailyReward.reward,
      time_granted: dateString
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error!!'
    });
  }
};

export default dailyReward;
