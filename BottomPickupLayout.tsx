import * as React from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { routes } from 'app/common/routes';
import vectorIcons from 'app/config/vectorIcons';
import styles from './style'
import images from 'app/config/images';
import AppStyles from 'app/config/styles';

const BottomPickupLayout = ({ tripData, type, props, languageSelected }: any) => {

  return (
    <LinearGradient colors={[AppStyles.color.COLOR_WHITE, AppStyles.color.COLOR_WHITE, AppStyles.color.COLOR_WHITE_OPACITY]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }} style={styles.container}>
      <View style={styles.innerContainer}>
        <LinearGradient colors={[AppStyles.color.COLOR_IVORY, AppStyles.color.COLOR_IVORY]} style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => { props.navigation.navigate(routes.TRIPDETAIL,{typeDetails:type+""}) }} style={styles.detailsInnerContainer}>
            <Text style={styles.tripDetailsText}>{languageSelected.tripDetails}</Text>
            <Image source={images.right_circle_arrow} style={styles.imageArrow}></Image>

          </TouchableOpacity>

        </LinearGradient>


        <View style={styles.driverDetailsContainer}>
          <Image style={styles.imageDriver} source={tripData.profileImage == null?images.avatar:{uri:tripData.profileImage+""}}></Image>
          <View style={styles.driverContainer}>
            <Text style={styles.driverNameText}>{tripData.driverName}</Text>
            <View style={styles.starContainer}>
              <AntDesign name={vectorIcons.star} size={12} color={AppStyles.color.COLOR_GOLDEN_GLOW} style={styles.starImage}></AntDesign>
              <Text style={styles.ratingText}>{tripData.driverAvgRating == null?"0":parseFloat(tripData.driverAvgRating+"").toFixed(1)} {languageSelected.stars}</Text>
            </View>
          </View>


        </View>
        <View style={styles.line}></View>
        <View style={styles.dropContainer}>
          <View style={styles.dropInnerContainer}>
            <View style={styles.dropImageContainer}>
              <View style={styles.dropInnerImageContainer}>
                <Entypo name={vectorIcons.locationPin} size={widthPercentageToDP(6)} color={AppStyles.color.COLOR_EMERALD} style={styles.pinImage}></Entypo>
              </View>
              <Text style={styles.dropOffText}>{languageSelected.dropOff}{"\n"}
                <Text style={styles.endText}>{tripData.endLocationName}</Text>
              </Text>
            </View>
          </View>
        </View>

      </View>

    </LinearGradient>
  )
};
export default BottomPickupLayout;
