const Queue = require("bee-queue");
const queue = new Queue("example");

(async () => {
	for (let index = 0; index < 5; index++) {
		const job = await queue
			.createJob({ x: index, y: index, clientId: process.pid })
			.save();

		const result = await new Promise((resolve, reject) => {
			job.on("succeeded", (result) => {
				return resolve(result);
			});
			job.on("failed", (error) => {
				return reject(error);
			});
		});
		console.log(
			`Received result for job ${job.id}: ${JSON.stringify(result, null, 2)}`
		);
	}
})();
