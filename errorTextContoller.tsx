import * as React from 'react';
import { Text, View } from "react-native";
import { isEmpty, validateEmail } from 'app/utils/validate';
import responseCode from 'app/config/responseCode';
import styles from './style'
import AppConstant from 'app/config/constant';


const ErrorView = (message: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{message}</Text>
        </View>
    )
}

const validate = (validateType: any, title: any, value: any, apiCode: any, languageSelected: any) => {

    switch (validateType) {
        case AppConstant.EMPTY:
            if (isEmpty(value)) {
                return (ErrorView(languageSelected.pleaseEnter + title)
                )
            } else {
                return (<View></View>)
            }
            break;
        case AppConstant.EMAIL:
            if (isEmpty(value)) {
                return (ErrorView(languageSelected.pleaseEnter + title)
                )
            } else if (!validateEmail(value)) {
                return (ErrorView(languageSelected.emailValidate))
            } else if (apiCode == responseCode.USER_ALREADY_EXIST) {
                return (ErrorView(languageSelected.emailExist))
            } else {
                return (<View></View>)
            }
            break;
        case AppConstant.MOBILE:
            if (isEmpty(value)) {
                return (ErrorView(languageSelected.pleaseEnter + title)
                )
            }
            else if (apiCode == responseCode.MOBILE_NUMBER_ALREADY_EXIST) {
                return (ErrorView(languageSelected.mobileNumberExist))
            } else {
                return (<View></View>)
            }
            break;



    }
    return (<View></View>)
}
const validateApiCode = (apiCode: any, validateType: any, languageSelected: any) => {
    switch (validateType) {
        case AppConstant.EMAIL:
            if (apiCode == responseCode.USER_ALREADY_EXIST) {
                return (ErrorView(languageSelected.emailExist))
            } else {
                return (<View></View>)
            }
            break;
        case AppConstant.MOBILE:
            if (apiCode == responseCode.MOBILE_NUMBER_ALREADY_EXIST) {
                return (ErrorView(languageSelected.mobileNumberExist))
            } else if (apiCode == responseCode.INVALID_MOBILE_NUMBER) {
                return (ErrorView(languageSelected.registeredError))
            } else {
                return (<View></View>)
            }
    }
    return (<View></View>)
}



export const ErrorTextController = ({ isSubmit, title, validateType, value, apiCode, languageSelected }: any) => (

    <View>
        {isSubmit ? validate(validateType, title, value, apiCode, languageSelected)
            : apiCode != "" ? validateApiCode(apiCode, validateType, languageSelected) : <View></View>}

    </View>
);

export default ErrorTextController;