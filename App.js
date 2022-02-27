/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

const App = () => {
  const [otp, setOtp] = useState('');
  useEffect(() => {
    const getDeviceHashCode = async () => {
      try {
        const hash = await RNOtpVerify.getHash();
        if (hash) {
          console.log('device hash: ', hash)
        }
        return;
      } catch (err) {
        console.error(err)
      }
    }

    const getOtpFromMessage = async () => {
      try {
        const otp = await RNOtpVerify.getOtp();
        if (otp) {
          RNOtpVerify.addListener(handlerOTP);
        }
        return;
      } catch (err) {
        console.error(err);
      }
    }

    getDeviceHashCode()
      .then(() => getOtpFromMessage())
      .catch(err => console.error(err));
  }, [otp, setOtp]);

  const handlerOTP = message => {
    if (!!message) {
      const newOtp = /(\d{6})/g.exec(message)[1];
      setOtp(newOtp);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  }

  return (
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Text style={{color: 'white', marginBottom: 10}}>Let's learn to auto fill OTP 👨‍🎨</Text>
        <Text style={{color: 'white'}}>{otp} 🤗</Text>
        <TextInput />
      </View>
  );
};

export default App;
