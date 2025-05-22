import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Agent,
  HttpOutboundTransport,
  WsOutboundTransport,
  KeyDerivationMethod,
} from '@credo-ts/core';
import { agentDependencies } from '@credo-ts/react-native';
import { AskarModule } from '@credo-ts/askar';
import { ariesAskar } from '@hyperledger/aries-askar-react-native';

export default function App() {
  const [log, setLog] = useState('Initializing...');

  useEffect(() => {
    async function setupAgent() {
      setLog('1. Setting up agent...');

      const agent = new Agent({
        config: {
          label: 'MyCredoAgent',
          walletConfig: {
            id: 'my-wallet-id',
            key: 'my-wallet-key-00000000000000000000',
            keyDerivationMethod: KeyDerivationMethod.Argon2IMod,
          },
          autoUpdateStorageOnStartup: true,
          endpoints: [],
        },
        dependencies: agentDependencies,
        modules: {
          askar: new AskarModule({ ariesAskar }),
        },
      });

      agent.registerOutboundTransport(new HttpOutboundTransport());
      agent.registerOutboundTransport(new WsOutboundTransport());

      try {
        setLog((log) => log + '\n2. Initializing agent...');
        await agent.initialize();
        setLog((log) => log + '\n✅ Agent initialized!');

        setLog((log) => log + '\n3. Creating Peer DID...');
        const didResult = await agent.dids.create({ method: 'peer' });
        setLog((log) => log + `\n✅ Peer DID created: ${didResult.did}`);

        const allDids = await agent.dids.getCreatedDids();
        setLog((log) => log + `\n총 DID 개수: ${allDids.length}`);
      } catch (e) {
        setLog((log) => log + `\n❌ Error: ${e.message || e}`);
      }
    }

    setupAgent();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Credo + Aries Askar Example</Text>
        <Text selectable style={styles.log}>
          {log}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 16 },
  log: { fontSize: 14, color: '#222' },
});
