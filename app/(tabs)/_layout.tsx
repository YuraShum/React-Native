import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import TabsIcon from '@/components/(tabs)/TabsIcon'

import { icons } from '../../constants'



type Props = {}

const TabsLayout = (props: Props) => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                }}>
                {/** home tabs */}
                <Tabs.Screen
                    name='home'
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabsIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }} />

                {/** bookmark tabs */}
                <Tabs.Screen
                    name='bookmark'
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabsIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Bookmark"
                                focused={focused}
                            />
                        )
                    }} />
                
                {/** create tabs */}
                <Tabs.Screen
                    name='create'
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabsIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        )
                    }} />

                {/** profile tabs */}
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabsIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        )
                    }} />
            </Tabs>
        </>
    )
}

export default TabsLayout