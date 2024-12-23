import React from "react";
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from "react-native";

export default function RootLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to React Native!</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>AOra!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Your App Name</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },
    header: {
        backgroundColor: "#6200ea",
        padding: 16,
    },
    headerText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bodyText: {
        fontSize: 18,
        color: "#333",
    },
    footer: {
        backgroundColor: "#e2e8f0",
        padding: 12,
        alignItems: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#555",
    },
});
