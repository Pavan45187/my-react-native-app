import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

interface FeatureCardProps {
  title: string;
  subtitle: string;
  image: any;
  buttonLabel: string;
  onPress: () => void;
}

const FeatureCard = ({
  title,
  subtitle,
  image,
  buttonLabel,
  onPress,
}: FeatureCardProps) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle !== '' && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>

    <Image source={image} style={styles.image} resizeMode="contain" />
  </TouchableOpacity>
);

export default function FeatureCards() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FeatureCard
        title="Mirror Pro"
        subtitle=""
        image={require('../assets/images/mirrorpro.png')}
        buttonLabel="View"
        onPress={() => router.push('/feature/mirrorpro')}
      />

      <FeatureCard
        title="Pledge"
        subtitle="My Gold"
        image={require('../assets/images/pledgegold.png')}
        buttonLabel="Now"
        onPress={() => router.push('/feature/pledgegold')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: -2,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});
