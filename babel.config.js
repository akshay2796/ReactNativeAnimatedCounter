module.exports = function override(api) {
	var env = api.cache(() => process.env.NODE_ENV);
	var isProd = api.cache(() => process.env.NODE_ENV === 'production');
	var config;
	if (!isProd) {
		config = {
			presets: ['module:metro-react-native-babel-preset'],
		};
	} else {
		config = {
			plugins: [
				[
					'transform-remove-console',
					{
						exclude: ['error', 'warn'],
					},
				],
			],
			presets: ['module:metro-react-native-babel-preset'],
		};
	}

	return config;
};
