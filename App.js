import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KindleProvider, useKindleController, DESIGN_TOKENS } from './src/controllers/KindleController';
import Tela1 from './Tela1';
import Tela2 from './Tela2';
import Tela3 from './Tela3';
import Tela4 from './Tela4';
import Tela5 from './Tela5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function KindleBottomTabs() {
  const { palette, appTheme, selectedBook } = useKindleController();
  const isDark = appTheme === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Tela1"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: isDark ? '#DAA520' : '#704214',
        tabBarInactiveTintColor: isDark ? '#A89E93' : '#6E645A',
        tabBarStyle: {
          backgroundColor: isDark ? '#14110E' : '#FFFDF9',
          borderTopColor: isDark ? '#302A24' : '#DCCB9E',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 66,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: DESIGN_TOKENS.fonts.sans,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'book-outline';
          if (route.name === 'Tela1') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tela2') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Tela3') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Tela4') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Tela5') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          if (route.name === 'Tela3') {
            return (
              <View
                style={[
                  styles.readerTabIconWrap,
                  {
                    backgroundColor: focused
                      ? '#704214'
                      : isDark
                      ? '#221E1A'
                      : '#EFE6D5',
                    borderColor: focused ? '#DAA520' : palette.border,
                  },
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={18}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            );
          }

          return <Ionicons name={iconName} size={size || 20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Tela1"
        component={Tela1}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Tela2"
        component={Tela2}
        options={{ title: 'Biblioteca' }}
      />
      <Tab.Screen
        name="Tela3"
        component={Tela3}
        options={{
          title: 'Leitor',
          tabBarBadge: selectedBook?.progressPercent
            ? `${selectedBook.progressPercent}%`
            : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#006400',
            color: '#FFFFFF',
            fontSize: 9,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="Tela4"
        component={Tela4}
        options={{ title: 'Explorar' }}
      />
      <Tab.Screen
        name="Tela5"
        component={Tela5}
        options={{ title: 'Mais' }}
      />
    </Tab.Navigator>
  );
}

function RootNavigation() {
  const { appTheme, palette } = useKindleController();
  const baseTheme = appTheme === 'dark' ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: palette.bg,
      card: palette.card,
      text: palette.text,
      border: palette.border,
      primary: palette.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="KindleRoot" component={KindleBottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <KindleProvider>
        <RootNavigation />
      </KindleProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  readerTabIconWrap: {
    width: 34,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
