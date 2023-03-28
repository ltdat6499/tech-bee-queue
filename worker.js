const Queue = require("bee-queue");
const queue = new Queue("example");

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

queue.process(async (job) => {
	console.log(`Processing job ${job.id}`);
	await sleep(2000);
	return {
		result: job.data.x + job.data.y,
		clientId: job.data.clientId,
	};
});
