import 'react-native-get-random-values';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Agent} from '@credo-ts/core';
import {agentDependencies} from '@credo-ts/react-native';
import {AskarModule} from '@credo-ts/askar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#181818' : '#f3f3f3',
  };

  const [did, setDid] = useState('');

  useEffect(() => {
    async function initCredo() {
      try {
        // Credo 0.5.x + Askar
        const agent = new Agent({
          config: {
            label: 'KeyWeCredo',
            walletConfig: {
              id: 'test-wallet-id',
              key: 'testkey00000000000000000000000000', // 32자
            },
            autoUpdateStorageOnStartup: true,
          },
          dependencies: agentDependencies,
          modules: {
            askar: new AskarModule({}),
          },
        });

        await agent.initialize();

        // peer DID 생성
        const didInfo = await agent.dids.create({method: 'peer'});
        if (didInfo.didState && didInfo.didState.did) {
          setDid(didInfo.didState.did);
        } else {
          setDid('DID 생성 실패');
        }
      } catch (err) {
        setDid(
          '생성 오류: ' + (err && err.message ? err.message : String(err)),
        );
      }
    }
    initCredo();
  }, []);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.content}>
          <Text style={styles.title}>Credo DID 생성 결과</Text>
          <Text selectable style={styles.didText}>
            {did ? did : 'DID 생성 중...'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#345678',
  },
  didText: {
    fontSize: 13,
    color: '#222',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default App;
