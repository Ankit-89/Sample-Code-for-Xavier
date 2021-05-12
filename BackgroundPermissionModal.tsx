import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AppStyles from "app/config/styles";
import Modal from "react-native-modal";
import images from "app/config/images";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";

const BackgroundPermissionModal = ({
  isModalVisible,
  languageSelected,
  onThanks,
  onTurn
}: any) => (
  <Modal isVisible={isModalVisible}>
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Image
          style={styles.rowCenter}
          resizeMode={"contain"}
          source={images.location_update}
        ></Image>
        <Text style={styles.textLogout}>
          {languageSelected.UseYourLocation}
        </Text>
        <Text style={styles.textLogout1}>
          {languageSelected.MapsForAutomatically}
        </Text>
        <Text style={styles.textLogout1}>
          {languageSelected.BackgroundLocation}
        </Text>
        <View style={styles.viewTwelve} />
        <Image
          style={styles.rowCenterImage}
          resizeMode={"contain"}
          source={images.locationBackground}
        ></Image>
        <View style={styles.rowCenterText}>
          <TouchableOpacity  onPress={onThanks} style={styles.notButton}>
            <LinearGradient
              colors={[
                AppStyles.color.COLOR_SOLITUDE,
                AppStyles.color.COLOR_SOLITUDE,
              ]}
              style={styles.notContainer}
            >
              <Text style={styles.notText}>{languageSelected.NoThanks}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yesButton} onPress={onTurn}>
            <LinearGradient
              colors={[
                AppStyles.color.COLOR_SINBAD,
                AppStyles.color.COLOR_WILLIAM,
              ]}
              style={styles.yesContainer}
            >
              <Text style={styles.yesText}>{languageSelected.TurnOn}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default BackgroundPermissionModal;
