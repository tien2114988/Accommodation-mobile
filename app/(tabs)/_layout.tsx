import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { i18n, Language } from '@/localization';

// Language

// i18n.locale = getLocales()[0].languageCode ?? "vn";
i18n.locale = 'vn';
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

export default function Layout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: '#059669',
        tabBarStyle: { paddingVertical: 10 },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: i18n.t('home'),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: 'Tìm phòng',
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: 'Hộp thư',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Tài khoản',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
