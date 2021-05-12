import React from 'react';
import { Image, View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import images from 'app/config/images';
import AppStyles from 'app/config/styles';
import styles from './style';

const CancelTripConfirmatonModal = ({ onBack,languageSelected, isModalVisibleTripCancel, onTripCancel, onNoClick }: any) => {
  return (
    <Modal 
    onRequestClose={onBack}
    visible={isModalVisibleTripCancel} animationType="fade" transparent={true} >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.cancelContainer}>
            <Image style={styles.cancelImage} source={images.cancelConfirm}></Image>
            <Text style={styles.confirmText}>{languageSelected.confirmCancellation}</Text>
            <View style={styles.center}>
              <Text style={styles.confirmTextMessage}>{languageSelected.cancellationMessage}</Text>
            </View>
            <View style={styles.rowCenter}>
              <TouchableOpacity style={styles.notButton} onPress={onNoClick}>
                <LinearGradient colors={[AppStyles.color.COLOR_SOLITUDE, AppStyles.color.COLOR_SOLITUDE]} style={styles.notContainer}>
                  <Text style={styles.notText}>{languageSelected.no}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesButton} onPress={onTripCancel}>
                <LinearGradient colors={[AppStyles.color.COLOR_SINBAD, AppStyles.color.COLOR_WILLIAM]} style={styles.yesContainer}>
                  <Text style={styles.yesText}>{languageSelected.yes}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>



  );

};
export default CancelTripConfirmatonModal;
