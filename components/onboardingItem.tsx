import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { OnboardingSlide } from '../constants/onboardingData'; // Import the type

// Define props based on the data structure
interface OnboardingItemProps extends OnboardingSlide {
    totalSlides: number;
    currentIndex: number;
    onButtonPress: () => void;
    onSkipPress: () => void;
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ 
    image, 
    title, 
    description, 
    buttonText, 
    totalSlides, 
    currentIndex, 
    onButtonPress,
    onSkipPress
}) => {
    
    // --- Navigation Dots Component ---
    const Dots = () => (
        <View style={styles.dotsContainer}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <View 
                    key={index}
                    style={[
                        styles.dot, 
                        currentIndex === index ? styles.activeDot : styles.inactiveDot
                    ]} 
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar - Header Title and Skip Button */}
            <View style={styles.header}>
                 
                 <TouchableOpacity onPress={onSkipPress}>
                    <Text style={styles.skipText}>Skip</Text>
                 </TouchableOpacity>
            </View>

            {/* 2. Image Section */}
            <View style={styles.imageSection}>
                 
                         <Image source={{ uri: image }} style={styles.contentImage} resizeMode="contain" />
                    
             </View>


            {/* 3. Text Section & Controls */}
            <View style={styles.textSection}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

                <Dots />
                
                {/* Continue / Get Started Button */}
                <TouchableOpacity onPress={onButtonPress} style={styles.continueButton}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Styling (Use the styles from the previous answer, refined) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Light cream background
    },
    // --- Header (To combine Onboarding N and Skip) ---
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 50, // For Status Bar clearance
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    skipText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: '#000000B2',
        fontWeight: 'bold',
        
    },
    // --- Image Section ---
    imageSection: {
        flex: 0.50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentImage: {
        width: 640, 
        height: 618,
        top: 87,
    },
  
    // --- Text Section & Button ---
    textSection: {
        flex: 0.55,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 34,
        fontWeight: '500',
        color: '#1E1E1E',
        marginBottom: 10,
        letterSpacing: 0,
    },
    description: {
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center',
        color: '#878787',
        lineHeight: 20,
        marginBottom: 30,
    },
    // --- Navigation Dots ---
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#8EDFEB',
    },
    activeDot: {
        width: 8, // Longer dot for the active screen
        backgroundColor: '#5063BF', // Teal/Green color
    },
    // --- Continue Button ---
    continueButton: {
        width: 201,
        height: 54,
        borderRadius: 20,
        backgroundColor: '#2EC4B6',
        paddingVertical: 12,
        // Add shadow styles here if desired
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default OnboardingItem;