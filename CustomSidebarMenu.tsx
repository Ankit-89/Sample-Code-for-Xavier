import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, Platform } from "react-native";
import { Title } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import images from "app/config/images";
import AppStyles from "app/config/styles";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import { ILoginState } from "app/models/reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { logOut } from "app/store/actions/loginActions";
import { useIsFocused } from "@react-navigation/native";
import { routes } from "app/common/routes";
import configureStore from "app/store";

interface IState {
  loginReducer: ILoginState;
}

import * as loginActions from 'app/store/actions/loginActions';
import LogoutModal from '../logoutModal/LogoutModal';
import styles from './style'
import AppConstant from 'app/config/constant';
import vectorIcons from 'app/config/vectorIcons';
import { ILanguageState } from 'app/models/reducers/language';
import { clearScheduleData } from 'app/store/actions/scheduleAction';
import { completeTrip } from 'app/store/actions/tripAction';
import { ITripState } from "app/models/reducers/trip";
import { RNToasty } from "react-native-toasty";

interface ILangState {
  languageReducer: ILanguageState;
}

interface ITripStates {
  tripReducer: ITripState;
}

const CustomSidebarMenu = (props: any) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [imageUser, setImageUser] = useState(images.avtar_brown);
  const userObj: any = useSelector(
    (state: IState) => state.loginReducer.userObject
  );
  const tripStatus = useSelector(
    (state: ITripStates) => state.tripReducer.tripStaus,
  );
  const isFocused = useIsFocused();
  const [isLogout, setIsLogout] = useState(false);
  const getuserObj: any = useSelector(
    (state: IState) => state.loginReducer.getUserResponse
  );
  const languageSelected: any = useSelector(
    (state: ILangState) => state.languageReducer.language
  );

  useEffect(() => {
    if (languageSelected) {
    }
  }, [languageSelected,tripStatus]);

  
  useEffect(() => {
    if (userObj.token) {
      setName(userObj.fullName);
    }
    if (userObj.profileImage) {
      setImageUser(userObj.profileImage);
    }
  }, [userObj]);

  useEffect(() => {
    if (isFocused) {
      if (userObj.token) {
        const currentState = configureStore();
        const { store } = currentState;
        const userObject = store.getState().loginReducer.userObject;
        setName(userObject.fullName);
        if (userObject.profileImage) {
          setImageUser(userObject.profileImage);
        }
      }
    }
  }, [isFocused]);

  const onLogout = () => {
  if(tripStatus == ""){
    dispatch(clearScheduleData());
    dispatch(completeTrip());
    dispatch(logOut());
    props.navigation.replace(routes.LOGINSTACKTWO, { screen: routes.WELCOME });
    setIsLogout(false);
  }else{
    setIsLogout(false);
    RNToasty.Error({title:languageSelected.completeTripDriver})
  }
  };

  useEffect(() => {
    if (getuserObj.fullName) {
      setName(getuserObj.fullName);

      const currentState = configureStore();
      const { store } = currentState;
      const imageChange = store.getState().loginReducer.imageChange;
      if (!getuserObj.profileImage) {
        setImageUser(images.avtar_brown);
      }
      if (imageChange) {
        if (getuserObj.profileImage) {
          setImageUser(getuserObj.profileImage);
        } else {
          setImageUser(images.avtar_brown);
        }
      }
      dispatch(loginActions.updateLoginObject(getuserObj));
    }
  }, [getuserObj]);

  useEffect(() => {
    const currentState = configureStore();
    const { store } = currentState;
    const userObject = store.getState().loginReducer.userObject;

    dispatch(loginActions.onClearResponse());
    dispatch(loginActions.onClearUserObject());
    dispatch(loginActions.onGetUserDetails(userObject));
  }, []);

  return (
    <View style={styles.container}>
      <LogoutModal
        languageSelected={languageSelected}
        onCloseModal={() => {
          setIsLogout(false);
        }}
        isModalVisible={isLogout}
        onEnable={() => onLogout()}
        onNot={() => {
          setIsLogout(false);
        }}
      ></LogoutModal>

      {Platform.OS == AppConstant.IOS && <View style={styles.space}></View>}
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate(routes.PROFILESCREEN);
              }}
            >
              <View style={styles.userContainer}>
                <Image style={styles.imgImage} source={imageUser} />
                <View style={styles.centerColum}>
                  <Title numberOfLines={1} style={styles.title}>
                    {name}
                  </Title>
                </View>
                <Entypo
                  name={vectorIcons.chevronSmallRight}
                  size={35}
                  style={{ paddingTop: 5 }}
                  color={AppStyles.color.COLOR_WHITE}
                ></Entypo>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(routes.TripDetails);
          }}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.imgDrawerIcon}
              source={images.drawer_trip}
            ></Image>
            <View style={styles.textContainer}>
              <Text style={styles.textDrawerItem}>
                {languageSelected.TripHistory}
              </Text>
            </View>
            <Entypo
              name={vectorIcons.chevronSmallRight}
              size={35}
              style={styles.iconPadding}
              color={AppStyles.color.COLOR_WHITE}
            ></Entypo>

            <View></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(routes.CustomerChatSupport);
          }}
        >
          <View style={styles.helpContainer}>
            <Image
              style={styles.imgDrawerIcon}
              source={images.drawer_help}
            ></Image>
            <View style={styles.textContainer}>
              <Text style={styles.textDrawerItem}>{languageSelected.help}</Text>
            </View>
            <Entypo
              name={vectorIcons.chevronSmallRight}
              size={35}
              style={styles.iconPadding}
              color={AppStyles.color.COLOR_WHITE}
            ></Entypo>

            <View></View>
          </View>
        </TouchableOpacity>
        <View style={styles.helpContainer}>
          <Image
            style={styles.imgDrawerIcon}
            source={images.drawer_earning}
          ></Image>
          <View style={styles.textContainer}>
            <Text style={styles.textDrawerItem}>{languageSelected.payment}</Text>
          </View>
          <Entypo
            name={vectorIcons.chevronSmallRight}
            size={35}
            style={styles.iconPadding}
            color={AppStyles.color.COLOR_WHITE}
          ></Entypo>


          

          <View></View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(routes.TERMS);
          }}
        >
        <View style={styles.helpContainer}>
          <Image
            style={styles.imgDrawerIcon}
            source={images.lock}
          ></Image>
          <View style={styles.textContainer}>
            <Text style={styles.textDrawerItem}>{languageSelected.termsConditions}</Text>
          </View>
          <Entypo
            name={vectorIcons.chevronSmallRight}
            size={35}
            style={styles.iconPadding}
            color={AppStyles.color.COLOR_WHITE}
          ></Entypo>


          

          <View></View>
        </View>
</TouchableOpacity>


<TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(routes.PRIVACY);
          }}
        >
        <View style={styles.helpContainer}>
          <Image
            style={styles.imgDrawerIcon}
            source={images.lock}
          ></Image>
          <View style={styles.textContainer}>
            <Text style={styles.textDrawerItem}>{languageSelected.privacyPolicy}</Text>
          </View>
          <Entypo
            name={vectorIcons.chevronSmallRight}
            size={35}
            style={styles.iconPadding}
            color={AppStyles.color.COLOR_WHITE}
          ></Entypo>


          

          <View></View>
        </View>
</TouchableOpacity>

{/* This commented because it will use in MVP2 */}
        {/* <View style={styles.helpContainer}>
          <Image style={styles.imgDrawerIcon} source={images.drawer_settings}></Image>
          <View style={styles.textContainer}>
            <Text style={styles.textDrawerItem}>
              {languageSelected.settings}
            </Text>
          </View>
        </View> */}




        <View style={styles.lineSeperator}>
          <View style={styles.innerLine}></View>
        </View>
      </DrawerContentScrollView>

      <TouchableWithoutFeedback
        onPress={() => {
          setIsLogout(true);
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            AppStyles.color.COLOR_VALENCIA,
            AppStyles.color.COLOR_BACKGROUND_BROWN,
          ]}
          style={styles.logoutContainer}
        >
          <View style={styles.drawerLayout}>
            <Image
              style={styles.imgLogout}
              source={images.drawer_logout}
            ></Image>
            <View style={styles.textContainer}>
              <Text style={styles.logoutText}>
                {languageSelected.logoutText}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomSidebarMenu;
