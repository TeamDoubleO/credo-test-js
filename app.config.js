export default {
  expo: {
    name: 'key-we-app',
    slug: 'key-we-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logoIcon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/images/logoIcon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.zzzzzisu.keyweapp',
      minSdkVersion: 24,
      adaptiveIcon: {
        foregroundImage: './assets/images/logoIcon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/logoIcon.png',
    },
    extra: {
      eas: {
        projectId: 'ded08ce6-04e7-4dfa-869e-859b02c534e1',
      },
      //BASE_URL: 'http://keywe.site', // EKS 사용시
      BASE_URL: 'http://192.168.0.111:8081', // 도커 사용시 - 본인 pc IPv4 주소로 수정하세용
    },
  },
};
