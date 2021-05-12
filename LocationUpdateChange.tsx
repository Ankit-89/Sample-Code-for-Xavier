import * as React from 'react';
import { Text, TouchableOpacity, View, Image } from "react-native";
import { widthPercentageToDP } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from "app/config/styles";
import Modal from 'react-native-modal';
import images from 'app/config/images';
import styles from './style'


const LocationUpdateChange = ({ isModalVisible, onDone, dropOffLocation, languageSelected }: any) => (
  <Modal isVisible={isModalVisible}>
    <View style={styles.container}>
      <View style={{ width: widthPercentageToDP(90) }}>
        <Image style={styles.rowCenter} resizeMode={"contain"} source={images.location_update}></Image>
        <Text style={styles.textLogout}>{languageSelected.locationChangeConfirmed}</Text>
        <Text style={styles.textMessage}>{languageSelected.locationChargeText}</Text>
    <View style={styles.seperatorLine}></View>
    <View style={styles.locationContainer}>
    <View style={styles.locationInnerContainer}>
        <Image source={images.location_green} style={styles.imgLocation}></Image>
    </View>
    <View style={styles.textContainer}>
    <Text style={styles.textLocation}>{languageSelected.location}</Text>
<Text style={styles.textDrop} numberOfLines={2}>{dropOffLocation}</Text>
    </View>
    </View>    
    <View style={styles.seperatorLine}></View>
        <View style={styles.buttonContainer}>


          <TouchableOpacity onPress={onDone}>
            <LinearGradient colors={[AppStyles.color.COLOR_MANHATTAN, AppStyles.color.COLOR_COPPER]} style={[styles.linearGradient]}>
              <Text style={[styles.title]}>{languageSelected.ok}</Text>
            </LinearGradient>

          </TouchableOpacity>
          <View style={styles.rowContainer}></View>
         
        </View>
      </View>
    </View>
  </Modal>
);

export default LocationUpdateChange;
