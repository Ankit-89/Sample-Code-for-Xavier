import { Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppConstant from 'app/config/constant';
import AppStyles from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    flexDirection: "column",
    backgroundColor: AppStyles.color.COLOR_BACKGROUND_BROWN,
  },
  loginContainer: {
    margin: wp(5),
    flexDirection: "column",
  },
  textContainer: {
    marginRight: wp(1),
  },
  imageContainer: {
    height: hp('37%'),
    width: wp('100%'),
    flexDirection: "column"
  },
  carImage: {
    height: hp('30%'),
    width: wp('80%'),
    marginTop:hp(7),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  carImageContainer: {
    height: hp('30%'),
    width: wp('100%'),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    height: hp('20%'),
    width: wp('100%'),
    marginTop: hp(5),
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },

  inputTextContainer: {
    height: hp('7%'),
    width: wp('90%'),
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: AppStyles.color.COLOR_ABBEY,
    justifyContent: "center",
    borderRadius: 5,
  },
  loginText: {
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    fontSize: wp('5.8%'),
    color: AppStyles.color.COLOR_WHITE,
    marginTop: hp(2),
  },
  mobileText: {
    fontFamily: AppStyles.fonts.SF_FONT_BOLD,
    fontSize: wp('4.12%'),
    color: AppStyles.color.COLOR_ALTO,
    marginTop: hp(2),
    fontWeight: '600',
  },
  termsText: {
    fontFamily: AppStyles.fonts.SF_FONT_MEDIUM,
    fontSize: Platform.OS == AppConstant.IOS ? hp(1.8) : hp(1.9),
    width: wp('80%'),
    alignSelf: "center",
    color: AppStyles.color.COLOR_WHITE,
    textAlign: "center",
    marginTop: hp("3.5%"),
    fontWeight: '400',
  },
  termsTextUnderLine: {
    fontFamily: AppStyles.fonts.SF_FONT_MEDIUM,
    fontSize: Platform.OS == AppConstant.IOS ? hp(1.8) : hp(1.9),
    color: AppStyles.color.COLOR_YELLOW,
    textAlign: "center",
    fontWeight: '400',
  },
  codeText: {
    fontFamily: AppStyles.fonts.FONT_REGULAR,
    fontSize: hp(1.8),
    alignSelf: "center",
    paddingTop: Platform.OS == AppConstant.IOS ? 3 : 0,
    color: AppStyles.color.COLOR_WHITE,
    textAlign: "center",
    marginLeft: wp(2),
    fontWeight: '400',
  },
  textInputNumber: {
    width: wp('48%'),
    overflow: 'hidden',
    marginLeft: wp('2%'),
    height: hp('5%'),
    color: AppStyles.color.COLOR_INPUT_NUMBER,
    backgroundColor: AppStyles.color.COLOR_ABBEY,
    fontSize: Platform.OS == AppConstant.IOS ? hp(2.4) : hp(2.5),
    fontFamily: AppStyles.fonts.FONT_REGULAR
  },
  validateContainer: {
    width: wp('10%'),
    height: hp('7%'),
    marginTop: hp(0.5),
    justifyContent: "center",
    alignContent: "center"
  },
  dropdown: {
    marginLeft: 3,
    marginTop: 2
  },
  flag: {
    width: wp(7),
    height: wp(5),
    borderRadius: 2,
  },
  space: {
    height: hp(3),
  },
  forgot: {
    marginTop: 12,
  },
  labelStyle: {
    fontSize: 12,
  },
});

export default styles;
