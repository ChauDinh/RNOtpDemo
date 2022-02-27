# React Native OTP suggestion example

A simple application (React Native crossplatform) with suggest OTP (One time passcode) feature.

## What we will cover?

- Implement suggest OTP feature for both Android and IOS
- Explore native UI components (Android, IOS) and wrap them around React Native components
- Unit tests, automation tests

## Usages:

The code I use for detecting OTP (One time passcode) on Android is:

```JavaScript
// import React, React Native components...

const App = () => {
  const [otp, setOtp] = useState(''); // initialize the otp as an empty string

  useEffect(() => {
    /**
     * the getDeviceHashCode get the code based on each device. 
     * Then we use the hash code, send to server for creating SMS message
     * The format of a valid SMS follow by Google SMS Retriever
    */
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

    /**
     * the getOtpFromMessage detect the OTP code from incoming message
     * the handlerOTP function is a callback store OTP into state and do some extra works
    */
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
  }, [otp, setOtp])

  const handlerOTP = message => {
    if (!!message) {
      const newOtp = /(\d{6})/g.exec(message)[1];
      setOtp(newOtp);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  }
}
```