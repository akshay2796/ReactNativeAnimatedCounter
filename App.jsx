/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Animated as AnimatedNative,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts } from './constants';
import Animated, { Value, Easing, Extrapolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function App() {
	const listRef = React.useRef(null);
	const FlatListData = Array.from(Array(99), (_, i) => i + 1);
	const AddToCart = () => {
		const [count, setCount] = useState(0);

		const animatedVal = useRef(new Value(0)).current;

		const addBtnScale = animatedVal.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0],
			extrapolate: Extrapolate.CLAMP,
		});

		const addBtnOpacity = animatedVal.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0],
			extrapolate: Extrapolate.CLAMP,
		});

		const counterOpacity = animatedVal.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: Extrapolate.CLAMP,
		});

		const counterScale = animatedVal.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: Extrapolate.CLAMP,
		});

		const changeCount = (val) => {
			if (count === 0 && val === 1) {
				Animated.timing(animatedVal, {
					toValue: 1,
					duration: 250,
					easing: Easing.ease,
				}).start(() => setCount(val));
			} else if (count === 1 && val === 0) {
				Animated.timing(animatedVal, {
					toValue: 0,
					duration: 250,
					easing: Easing.ease,
				}).start();
				setCount(val);
			} else if (val < 100) {
				console.log('Count: ' + val);
				setCount(val);
				if (listRef?.current) {
					listRef?.current?.scrollToIndex({
						index: val === 0 ? val : val - 1,
						animated: true,
					});
				}
			}
		};

		return (
			<>
				<Animated.View
					style={[
						styles.itemCounterContainer,
						{
							transform: [
								{
									scale: counterScale,
								},
							],
							opacity: counterOpacity,
						},
					]}>
					<TouchableOpacity
						style={{
							flex: 1,
						}}
						onPress={() => {
							changeCount(count - 1);
						}}>
						<View style={styles.countContainer}>
							<Text style={styles.count}>−</Text>
						</View>
					</TouchableOpacity>
					<Animated.View style={styles.countTextContainer}>
						<AnimatedNative.FlatList
							ref={listRef}
							data={FlatListData}
							renderItem={({ item, index }) => {
								return (
									<Animated.View
										key={index}
										style={{
											height: 30,
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										<Text style={styles.countText}>
											{item}
										</Text>
									</Animated.View>
								);
							}}
							contentContainerStyle={{
								height: 3000,
							}}
							keyExtractor={(item, index) => index.toString()}
							scrollEnabled={false}
							bounces={false}
							showsVerticalScrollIndicator={false}
						/>
					</Animated.View>
					<TouchableOpacity
						style={{
							flex: 1,
						}}
						onPress={() => {
							console.log('Updating in cart');
							changeCount(count + 1);
						}}>
						<Animated.View style={styles.countContainer}>
							<Text style={styles.count}>+</Text>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View
					style={[
						styles.addBtnContainer,
						{
							transform: [
								{
									scale: addBtnScale,
								},
							],
							opacity: addBtnOpacity,
						},
						count > 0 && styles.d_none,
					]}>
					<TouchableOpacity
						onPress={() => {
							// btnToggle(!btnEnabled);
							// cartAction(Actions.ADD_TO_CART);
							changeCount(count + 1);
							console.log('Adding in cart');
						}}>
						<View
							style={{
								flex: 1,
								width: 75,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Text style={styles.addBtnText}>Add</Text>
						</View>
					</TouchableOpacity>
				</Animated.View>
			</>
		);
	};
	return (
		<View style={styles.container}>
			<AddToCart />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	d_none: {
		display: 'none',
	},
	cardContainer: {
		flexDirection: 'row',
		paddingVertical: 10,
		alignSelf: 'center',
		padding: 8,
		width: '100%',
		backgroundColor: Colors.white,
	},
	titleContainer: {
		backgroundColor: '#f1f1f1',
	},
	title: {
		fontSize: 18,
		fontFamily: Fonts.semiBold,
	},
	brand: {
		color: '#8d8d8d',
		fontSize: 16,
		fontFamily: Fonts.semiBold,
		textTransform: 'capitalize',
	},
	flatListContainer: {
		paddingBottom: 80,
	},
	image: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
	},
	rating: {
		flexDirection: 'row',
		marginVertical: 2,
	},
	ratingContainer: {
		flexDirection: 'row',
		backgroundColor: '#ccecb1',
		alignItems: 'center',
		paddingHorizontal: 4,
		paddingVertical: 2,
		marginEnd: 5,
	},
	ratingText: {
		fontSize: 10,
		fontFamily: Fonts.semiBold,
		marginEnd: 4,
		color: Colors.greenText,
	},
	ratingStar: {
		fontSize: 10,
		fontFamily: Fonts.semiBold,
		color: Colors.greenText,
	},
	ratingCountContainer: {
		alignItems: 'center',
	},
	ratingCount: {
		fontSize: 13,
		fontFamily: Fonts.primary,
		textAlignVertical: 'bottom',
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: '#8d8d8d',
		width: '50%',
		marginVertical: 6,
		marginBottom: 35,
	},
	picker: {
		height: 30,
	},
	pickerItem: {
		height: 5,
	},
	price: {
		fontSize: 16,
		fontFamily: Fonts.bold,
	},
	oldPrice: {
		fontSize: 12,
		marginTop: 5,
		fontFamily: Fonts.semiBold,
		color: '#ff0000',
		textDecorationLine: 'line-through',
	},
	loveIcon: {
		fontSize: 20,
		marginRight: 5,
	},
	cartPlusIcon: {
		fontSize: 20,
	},
	filterIcon: {
		fontSize: 25,
	},
	listIcon: {
		fontSize: 20,
		marginEnd: 10,
	},
	gridIcon: {
		fontSize: 20,
	},
	addBtnContainer: {
		flexDirection: 'row',
		width: 75,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e66067',
		borderRadius: 5,
	},
	addBtnText: {
		fontFamily: Fonts.semiBold,
		textTransform: 'uppercase',
		color: Colors.white,
		textAlign: 'center',
	},
	itemCounterContainer: {
		position: 'absolute',
		borderRadius: 5,
		borderColor: Colors.black,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		width: 75,
		height: 30,
		overflow: 'visible',
	},
	countContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	count: {
		fontSize: 20,
		fontFamily: Fonts.semiBold,
		color: '#e66067',
	},
	countTextContainer: {
		flex: 1,
		height: 30,
		backgroundColor: '#e660674d',
		alignItems: 'center',
		justifyContent: 'center',
	},
	countText: {
		fontSize: 12,
		textAlign: 'center',
		fontFamily: Fonts.semiBold,
	},
});

export default App;
