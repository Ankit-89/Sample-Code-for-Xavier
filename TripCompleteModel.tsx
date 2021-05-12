import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import AppConstant from "app/config/constant";
import styles from "./style";
import AppStyles from "app/config/styles";
import images from "app/config/images";

const TripCompleteModel = ({
  isModalVisible,
  languageSelected,
  tripData,
  onDone,
  distanceData,
}: any) => (
  <Modal isVisible={isModalVisible}>
    <View style={styles.container}>
      <View style={styles.tickContainer}>
        <Image source={images.success_tick} style={styles.imgTick}></Image>
        <View style={styles.tripContainer}>
          <Text style={styles.completeText}>
            {languageSelected.tripCompleted}
          </Text>
          <Text style={styles.completeMessage}>
            {languageSelected.suceessCompletedTrip}
          </Text>
        </View>
      </View>

    
      <View style={styles.distanceContainer}>
        <View style={styles.distanceInnerContainer}>
          <Text style={styles.kmText}>{languageSelected.kmTravelled}</Text>
        </View>
        <View style={styles.kmContainer}>
          <Text style={styles.actualKmText}>
            {parseFloat(distanceData.distanceString + "").toFixed(2)} Kilometers
          </Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeInnerContainer}>
          <Text style={styles.timeTaken}>{languageSelected.timeTaken}</Text>
        </View>
        <View style={styles.timeValueContainer}>
          <Text style={styles.timeValue}>
            {parseInt(distanceData.timeString + "")} minutes
          </Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <View style={styles.priceInnnerContainer}>
          <Text style={styles.priceText}>{languageSelected.tripFare}</Text>
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.payAmountContainer}>
            {distanceData.tripFare} {AppConstant.AED}
          </Text>
        </View>
      </View>
      <View style={styles.methodContainer}>
        <View style={styles.methodInnerContainer}>
          <Text style={styles.methodText}>
            {languageSelected.paymentMethod}
          </Text>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{languageSelected.cash}</Text>
          <View style={styles.cardContainer}>
            <Image source={images.money} style={styles.imgCard}></Image>
          </View>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationInnerContainer}>
          <View style={styles.bigDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.smallDot}></View>
          <View style={styles.mediumDot}></View>
        </View>
        <View style={styles.starContainer}>
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{languageSelected.from}</Text>
            <Text style={styles.startLocationText}>
              {tripData.startLocationName}
            </Text>
          </View>

          <View style={styles.whereContainer}>
            <Text numberOfLines={3} style={styles.wherText}>
              {languageSelected.wherToText}
            </Text>
            <Text numberOfLines={3} style={styles.endLocationName}>
              {tripData.endLocationName}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onDone}>
        <LinearGradient
          colors={[AppStyles.color.COLOR_SINBAD, AppStyles.color.COLOR_WILLIAM]}
          style={styles.doneContainer}
        >
          <Text style={styles.doneText}>{languageSelected.okSmall}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default TripCompleteModel;
