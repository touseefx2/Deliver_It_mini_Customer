import {Platform, Alert, Linking} from 'react-native';
import {
  check,
  RESULTS,
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

// kinda handles all the permission in the application
export const checkForBasicPermissions = async () => {
  const permissions =
    Platform.OS === 'ios'
      ? [
          PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.PHOTO_LIBRARY,
        ]
      : [
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ];

  // Call our permission service and check for permissions
  const isPermissionGranted = await checkMultiplePermissions(permissions);
  if (!isPermissionGranted) {
    // Show an alert in case permission was not granted
    // Alert.alert(
    //   'Permission Request',
    //   'Please allow SurveyApp to access the Microphone.',
    //   [
    //     {
    //       text: 'Go to Settings',
    //       onPress: () => {
    //         Linking.openSettings();
    //       },
    //     },
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //   ],
    //   {cancelable: false},
    // );
  }
  return isPermissionGranted;
};

// This function can be used anywhere as it supports multiple permissions.
// It checks for permissions and then requests for it.
async function checkMultiplePermissions(permissions) {
  let isPermissionGranted = false;
  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    if (statuses[permissions[index]] === RESULTS.GRANTED) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}

// In case we want to check a single permission
async function checkPermission(permission) {
  var isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
}
