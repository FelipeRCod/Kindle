import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KindleProvider, useKindleController, DESIGN_TOKENS } from './src/controllers/KindleController';
import Tela_Inicial from './src/views/Tela_Inicial';
import Tela_Biblioteca from './src/views/Tela_Biblioteca';
import Tela_Leitor from './src/views/Tela_Leitor';
import Tela_Explorar from './src/views/Tela_Explorar';
import Tela_Mais from './src/views/Tela_Mais';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function KindleBottomTabs() {
  const { palette, appTheme, selectedBook } = useKindleController();
  const insets = useSafeAreaInsets();
  const isDark = appTheme === 'dark';

  const bottomSafeInset =
    Platform.OS === 'android'
      ? Math.max(insets.bottom, 48)
      : Math.max(insets.bottom, 14);

  return (
    <Tab.Navigator
      initialRouteName="Tela_Inicial"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: isDark ? '#DAA520' : '#704214',
        tabBarInactiveTintColor: isDark ? '#A89E93' : '#6E645A',
        tabBarStyle: {
          backgroundColor: isDark ? '#14110E' : '#FFFDF9',
          borderTopColor: isDark ? '#302A24' : '#DCCB9E',
          borderTopWidth: 1,
          height: 60 + bottomSafeInset,
          paddingTop: 6,
          paddingBottom: bottomSafeInset,
          paddingHorizontal: 6,
          elevation: 12,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontFamily: DESIGN_TOKENS.fonts.sans,
          fontWeight: '700',
          marginTop: 1,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName = 'book-outline';
          if (route.name === 'Tela_Inicial') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tela_Biblioteca') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Tela_Leitor') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Tela_Explorar') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Tela_Mais') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          if (route.name === 'Tela_Leitor') {
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
                  size={17}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            );
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Tela_Inicial"
        component={Tela_Inicial}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Tela_Biblioteca"
        component={Tela_Biblioteca}
        options={{ title: 'Biblioteca' }}
      />
      <Tab.Screen
        name="Tela_Leitor"
        component={Tela_Leitor}
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
            minWidth: 26,
            height: 16,
            lineHeight: 15,
          },
        }}
      />
      <Tab.Screen
        name="Tela_Explorar"
        component={Tela_Explorar}
        options={{ title: 'Explorar' }}
      />
      <Tab.Screen
        name="Tela_Mais"
        component={Tela_Mais}
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
    width: 32,
    height: 26,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
