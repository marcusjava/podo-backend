module.exports = {
	apps: [
		{
			name: 'podobackend',
			script: './src/index.js',
			max_memory_restart: '500M',
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};

//instances: 2,
//exec_mode: 'cluster',

//cron_restart: '0 0 0 * * *', // restart every minute (used for testing)
//autorestart: false, // this is the problem here
