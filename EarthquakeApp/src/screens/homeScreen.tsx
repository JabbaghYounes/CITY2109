import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { fetchEarthquakes } from '../services/earthquakeService';
import { styles } from '../styles/homeScreenStyles';
import { Earthquake } from '../types/earthquake';
import { getMagnitudeColor, formatRelativeTime } from '../utils/earthquakeUtils';

export const HomeScreen = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setError(null);
      const data = await fetchEarthquakes();
      setEarthquakes(data);
    } catch (err) {
      setError('Failed to fetch earthquake data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Loading earthquake data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Earthquakes</Text>
        <Text style={styles.subtitle}>
          {earthquakes.length} events in the last 24 hours
        </Text>
      </View>
      <FlatList
        data={earthquakes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.magnitudeContainer}>
              <View
                style={[
                  styles.magnitudeBadge,
                  { backgroundColor: getMagnitudeColor(item.properties.mag) },
                ]}
              >
                <Text style={styles.magnitudeText}>
                  {item.properties.mag.toFixed(1)}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.place} numberOfLines={2}>
                {item.properties.place}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.time}>
                  {formatRelativeTime(item.properties.time)}
                </Text>
                <Text style={styles.depth}>
                  Depth: {item.geometry.coordinates[2].toFixed(1)} km
                </Text>
              </View>
              {item.properties.tsunami === 1 && (
                <View style={styles.tsunamiWarning}>
                  <Text style={styles.tsunamiText}>Tsunami Warning</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}; 