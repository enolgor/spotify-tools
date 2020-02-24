import schedule from 'node-schedule';
import resyncJob from './resync';

const cronjobs = {};

cronjobs.scheduledJobs = new Map();

cronjobs.schedule = ({ name, rule, job }) => {
  console.log(`Scheduling job: ${name}, rule: ${rule}`);
  cronjobs.scheduledJobs.set(
    name,
    schedule.scheduleJob(rule, async () => {
      console.log(`Executing cronjob ${name}`);
      try {
        await job();
      } catch (e) {
        console.error(`Error execution cronjob ${name}: ${e}`);
      }
      console.log(`Finished execution of cronjob ${name}`);
    }),
  );
};

cronjobs.jobs = [resyncJob];

cronjobs.scheduleAll = () => {
  cronjobs.jobs.forEach(cronjobs.schedule);
};

export default cronjobs;
