import { Navigation } from 'react-native-navigation';

import {
  AUTH_NAV_ID,
  ROOT_NAV_ID,
  HOME_SCREEN,
  LOGIN_SCREEN,
  Other_NAV_ID
} from './navs';




/** stack initiateers */
export const goToLogin = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: AUTH_NAV_ID,
        children: [
          {
            component: {
              name: LOGIN_SCREEN,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });

 


  export const goToRequestPending = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: Other_NAV_ID,
        children: [
          {
            component: {
              name: "RequestPending",
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });


export const gotoHome = (c) => {
  Navigation.setRoot({
    root: {
      // bottomTabs: {
      //   children: [
      //     {
            stack: {
              id: ROOT_NAV_ID,
              children: [
                {
                  component: {
                    name: HOME_SCREEN,
                    passProps:{
                      c:c
                      },
                    options: {
                      bottomTab: {
                        text: 'Home',
                        icon: require('../assets/images/home.png'),
                        textColor: 'black',
                        // selectedFontSize: 20,
                      },
                      topBar: {
                        visible: false

                      }
                    }
                  }
                }
              ]
            }
      //     }
      //   ]
      // }
    }
  });
}
