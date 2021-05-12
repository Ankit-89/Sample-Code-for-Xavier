import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import * as aswS3 from "app/services/aswS3Utils";
import Moment from "moment";
import styles from "./style";
import images from "app/config/images";
import AppStyles from "app/config/styles";
import tripHistoryDetails from "app/services/tripHistoryDetails";
import AppConstant from "app/config/constant";
import { ILanguageState } from "app/models/reducers/language";
import NavigationService from "app/navigation/NavigationService";
import * as tripDetailAction from "app/store/actions/tripHistoryDetailsAction";
import { ITripDetailState } from "app/models/reducers/tripDetails";
import { routes } from "app/common/routes";
import vectorIcons from "app/config/vectorIcons";
import Loader from "app/components/loader/Loader";

interface ILangState {
  languageReducer: ILanguageState;
}

interface ITripDetailsState {
  tripHistoryDetailsReducer: ITripDetailState;
}

const TripHistoryDetails: React.FC = (props: any) => {
  const languageSelected: any = useSelector(
    (state: ILangState) => state.languageReducer.language
  );
  const goBack = () => NavigationService.goBack();
  const [isLoading, setLoading] = useState(false);
  const [tripsDetails, setTrips] = useState([]);
  const dispatch = useDispatch();
  const userObj: any = useSelector(
    (state: ITripDetailsState) => state.tripHistoryDetailsReducer.getTripDetails
  );

  useEffect(() => {
    onNewTripDetails();
  }, []);

  const getPicture = async (path: string) => {
    let awsUrl = await aswS3.getSignedUrl(path);

    return awsUrl;
  };

  const onNewTripDetails = async () => {
    setLoading(true);
    let status: any = await tripHistoryDetails();

    if (status.data.responseCode == AppConstant.SUCCESS) {
      let mainobj1 = status.data.result;
      for (let i = 0; i < mainobj1.rows.length; i++) {
        mainobj1.rows[i].car_details.carImage = await getPicture(
          String(mainobj1.rows[i].car_details.carImage)
        );
        if (
          mainobj1.rows[i].driver_details.profileImage != null &&
          mainobj1.rows[i].driver_details.profileImage != "" &&
          mainobj1.rows[i].driver_details.profileImage != "null"
        ) {
          mainobj1.rows[i].driver_details.profileImage = await getPicture(
            mainobj1.rows[i].driver_details.profileImage
          );
        }
        setLoading(false);
      }
      setTrips(mainobj1.rows);
      dispatch(tripDetailAction.onGetTripDetails(mainobj1));
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading}></Loader>
      <StatusBar
        backgroundColor={AppStyles.color.COLOR_BACKGROUND_BROWN}
        barStyle={"light-content"}
      />
      {Platform.OS == AppConstant.IOS && <View style={styles.iosSpace}></View>}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[
          AppStyles.color.COLOR_BACKGROUND_BROWN,
          AppStyles.color.COLOR_BACKGROUND_BROWN,
        ]}
        style={styles.linearViewMain}
      >
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Image style={styles.backImage} source={images.back}></Image>
        </TouchableOpacity>
        <View style={styles.viewOne}>
          <View style={styles.viewTwo}>
            <Text style={styles.textOne}>{languageSelected.TripHistory}</Text>
          </View>
        </View>
        <View style={styles.viewThree}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(routes.SCHEDULETRIPNOTIFICATIONS, {
                notificationType: AppConstant.READ,
              })
            }
          >
            <Image
              style={styles.imageOne}
              source={images.notification_black}
            ></Image>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <FlatList
        data={tripsDetails}
        keyboardShouldPersistTaps={"handled"}
        renderItem={({ item, index }) => {
          return (
            <View>
              {item.status == AppConstant.ONGOING ? (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(routes.TripOngoing, {
                      tripId: item.tripId,
                    });
                  }}
                >
                  <View style={styles.viewFour}>
                    <View style={styles.viewFive}>
                      <Text style={styles.textTwo}>
                        {languageSelected.tripStatus}
                      </Text>
                      <View style={styles.viewSix}>
                        <Text style={styles.textThree}>{item.status}</Text>
                      </View>
                    </View>
                    <View style={styles.viewSeven}>
                      <View style={styles.viewEight}>
                        <Entypo
                          name={vectorIcons.locationPin}
                          size={widthPercentageToDP(6)}
                          color={AppStyles.color.COLOR_DARK_BLUE}
                          style={styles.entypoOne}
                        ></Entypo>
                      </View>
                      <Text style={styles.textFour}>
                        {item.tripId}
                        {"\n"}
                        <Text style={styles.textFive}>
                          {Moment(item.tripDate).format("LLL")}
                        </Text>
                      </Text>
                      <Image
                        style={styles.imageTwo}
                        source={{ uri: item.car_details.carImage }}
                      ></Image>
                    </View>
                    <View style={styles.viewNine}>
                      <Image
                        style={styles.imageThree}
                        source={images.radio_button_on}
                      ></Image>

                      <View style={styles.viewTen} />
                      <Image
                        style={styles.imageFour}
                        source={images.radio_btn}
                      ></Image>
                    </View>

                    <View style={styles.viewEleven}>
                      <Text style={styles.textSix}>
                        <Text numberOfLines={2} style={styles.textSeven}>
                          {item.startLocationName}
                        </Text>
                      </Text>
                      <Text style={styles.textEight}>
                        <Text style={styles.textSeven}>
                          {item.endLocationName}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : item.status == AppConstant.SCHEDULED ? (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(routes.TripSchedule, {
                      tripId: item.tripId,
                    });
                  }}
                >
                  <View style={styles.viewFour}>
                    <View style={styles.viewFive}>
                      <Text style={styles.textTwo}>
                        {languageSelected.tripStatus}
                      </Text>
                      <View style={styles.viewSixteen}>
                        <Text style={styles.textThree}>{item.status}</Text>
                      </View>
                    </View>
                    <View style={styles.viewSeven}>
                      <View style={styles.viewEight}>
                        <Image
                          style={styles.imageFive}
                          source={images.calendar}
                        ></Image>
                      </View>
                      <Text style={styles.textFour}>
                        {item.tripId}
                        {"\n"}
                        <Text style={styles.textFive}>
                          {Moment(item.tripDate).format("LLL")}
                        </Text>
                      </Text>
                      <Image
                        style={styles.imageTwo}
                        source={{ uri: item.car_details.carImage }}
                      ></Image>
                    </View>
                    <View style={styles.viewNine}>
                      <Image
                        style={styles.imageThree}
                        source={images.radio_button_on}
                      ></Image>
                      <View style={styles.viewTwelve} />
                      <Image
                        style={styles.imageFour}
                        source={images.radio_btn}
                      ></Image>
                    </View>

                    <View style={styles.viewEleven}>
                      <Text style={styles.textSix}>
                        <Text numberOfLines={2} style={styles.textSeven}>
                          {item.startLocationName}
                        </Text>
                      </Text>
                      <Text style={styles.textEight}>
                        <Text style={styles.textSeven}>
                          {item.endLocationName}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : item.status == AppConstant.COMPLETED ? (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(routes.TripCompleted, {
                      tripId: item.tripId,
                    });
                  }}
                >
                  <View style={styles.viewFour}>
                    <View style={styles.viewFive}>
                      <Text style={styles.textTwo}>
                        {languageSelected.tripStatus}
                      </Text>
                      <View style={styles.viewSeventeen}>
                        <Text style={styles.textThree}>{item.status}</Text>
                      </View>
                    </View>
                    <View style={styles.viewSeven}>
                      <View style={styles.viewEight}>
                        <Image
                          style={styles.imageSix}
                          source={images.checkmarkTick}
                        ></Image>
                      </View>
                      <Text style={styles.textFour}>
                        {item.tripId}
                        {"\n"}
                        <Text style={styles.textFive}>
                          {Moment(item.tripDate).format("LLL")}
                        </Text>
                      </Text>
                      <Image
                        style={styles.imageTwo}
                        source={{ uri: item.car_details.carImage }}
                      ></Image>
                    </View>
                    <View style={styles.viewNine}>
                      <Image
                        style={styles.imageThree}
                        source={images.radio_button_on}
                      ></Image>
                      <View style={styles.viewThirteen} />
                      <Image
                        style={styles.imageFour}
                        source={images.radio_btn}
                      ></Image>
                    </View>

                    <View style={styles.viewEleven}>
                      <Text style={styles.textSix}>
                        <Text numberOfLines={2} style={styles.textSeven}>
                          {item.startLocationName}
                        </Text>
                      </Text>
                      <Text style={styles.textEight}>
                        <Text style={styles.textSeven}>
                          {item.endLocationName}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : item.status == AppConstant.CANCELLED ? (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(routes.TripCancel, {
                      tripId: item.tripId,
                    });
                  }}
                >
                  <View style={styles.viewFour}>
                    <View style={styles.viewFive}>
                      <Text style={styles.textTwo}>
                        {languageSelected.tripStatus}
                      </Text>
                      <View style={styles.viewFifteen}>
                        <Text style={styles.textThree}>{item.status}</Text>
                      </View>
                    </View>
                    <View style={styles.viewSeven}>
                      <View style={styles.viewEight}>
                        <Image
                          style={styles.imageSix}
                          source={images.checkmarkCircle}
                        ></Image>
                      </View>
                      <Text style={styles.textFour}>
                        {item.tripId}
                        {"\n"}
                        <Text style={styles.textFive}>
                          {Moment(item.tripDate).format("LLL")}
                        </Text>
                      </Text>
                      <Image
                        style={styles.imageTwo}
                        source={{ uri: item.car_details.carImage }}
                      ></Image>
                    </View>
                    <View style={styles.viewNine}>
                      <Image
                        style={styles.imageThree}
                        source={images.radio_button_on}
                      ></Image>
                      <View style={styles.viewFourteen} />
                      <Image
                        style={styles.imageFour}
                        source={images.radio_btn}
                      ></Image>
                    </View>

                    <View style={styles.viewEleven}>
                      <Text style={styles.textSix}>
                        <Text numberOfLines={2} style={styles.textSeven}>
                          {item.startLocationName}
                        </Text>
                      </Text>
                      <Text style={styles.textEight}>
                        <Text style={styles.textSeven}>
                          {item.endLocationName}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
        keyExtractor={(item: any) => item.tripId}
      ></FlatList>
    </View>
  );
};

export default TripHistoryDetails;
