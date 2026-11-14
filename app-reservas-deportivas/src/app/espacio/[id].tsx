// src/app/espacio/[id].tsx
// Pantalla de detalle de la cancha deportiva con galería, video expo-video y acceso a grilla

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSQLiteContext } from 'expo-sqlite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { normalizarUrlImagen, normalizarEspacio } from '../../api/cliente';
import { ESPACIOS_MOCK } from '../../mocks/datos';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { servicioEspacios } from '../../servicios/espacios';
import { ReproductorCancha } from '../../componentes/ReproductorCancha';
import { EstadoPantalla } from '../../componentes/EstadoPantalla';
import { Icono } from '../../componentes/Icono';
import type { Espacio } from '../../tipos/index';

const IMAGEN_RESPALDO_HERO =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';

export default function DetalleEspacioPantalla() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();
  const { usuario, alternarFavorito } = useSesion();
  const insets = useSafeAreaInsets();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacio, setEspacio] = useState<Espacio | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenIndice, setImagenIndice] = useState(0);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [falloImagen, setFalloImagen] = useState(false);

  const esFavorito = espacio && usuario?.espaciosFavoritos?.includes(espacio.id);
  const esPersonal = usuario?.rol === 'encargado' || usuario?.rol === 'administrador';

  useEffect(() => {
    async function cargar() {
      if (!id) return;
      try {
        setCargando(true);
        const dato = await servicio.obtenerEspacioPorId(id);
        if (!dato) throw new Error('No encontramos este espacio deportivo.');
        setEspacio(dato);
      } catch (err: any) {
        setError(err?.message || 'Error al cargar el detalle.');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, [id]);

  const handleFavoritoPress = async () => {
    if (!espacio) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await alternarFavorito(espacio.id);
  };

  const handleAgregarFoto = async () => {
    if (!id) return;
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Se necesita acceso a la galería para subir una foto.');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!res.canceled && res.assets[0]?.uri) {
        setSubiendoFoto(true);
        const local = res.assets[0].uri;
        const actualizadoCrudo = await servicioEspacios.agregarFoto(id, local);
        const actualizado = normalizarEspacio(actualizadoCrudo);
        setEspacio(actualizado);
        setFalloImagen(false);
        if (repo) {
          await repo.guardarEspacios([actualizado]);
        }
        setImagenIndice(0);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Éxito', 'La foto de la cancha fue agregada correctamente y guardada en el servidor.');
      }
    } catch (err: any) {
      Alert.alert('Error al subir foto', err?.message || 'No se pudo subir la foto.');
    } finally {
      setSubiendoFoto(false);
    }
  };

  const imagenRespaldo = useMemo(() => {
    if (!espacio) return IMAGEN_RESPALDO_HERO;
    const mock = ESPACIOS_MOCK.find((m) => m.id === espacio.id);
    return mock?.imagenes[imagenIndice] || mock?.imagenes[0] || IMAGEN_RESPALDO_HERO;
  }, [espacio, imagenIndice]);

  const urlActiva = useMemo(() => {
    if (!espacio) return IMAGEN_RESPALDO_HERO;
    const candidata = normalizarUrlImagen(espacio.imagenes?.[imagenIndice]);
    if (!falloImagen && candidata) return candidata;
    return imagenRespaldo;
  }, [espacio, imagenIndice, falloImagen, imagenRespaldo]);

  useEffect(() => {
    setFalloImagen(false);
  }, [imagenIndice, espacio]);

  return (
    <EstadoPantalla cargando={cargando} error={error}>
      {espacio && (
        <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContenido,
              { paddingBottom: 100 + insets.bottom },
            ]}
          >
            {/* Galería de Fotos */}
            <View style={[styles.galeriaContenedor, { backgroundColor: colores.chipFondo }]}>
              <Image
                source={{ uri: urlActiva }}
                style={styles.imagenHero}
                resizeMode="cover"
                onError={() => setFalloImagen(true)}
              />
              <TouchableOpacity
                style={[styles.botonFavoritoFlotante, { backgroundColor: colores.tarjeta }]}
                onPress={handleFavoritoPress}
              >
                <Icono
                  nombre={esFavorito ? 'heart' : 'heart-outline'}
                  tamano={24}
                  color={esFavorito ? colores.peligro : colores.textoSecundario}
                />
              </TouchableOpacity>

              {esPersonal && (
                <TouchableOpacity
                  style={[styles.botonAgregarFotoFlotante, { backgroundColor: colores.primario }]}
                  onPress={handleAgregarFoto}
                  disabled={subiendoFoto}
                  activeOpacity={0.8}
                >
                  <Icono
                    nombre={subiendoFoto ? 'hourglass-outline' : 'camera-outline'}
                    tamano={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.botonAgregarFotoTexto}>
                    {subiendoFoto ? 'Subiendo...' : 'Agregar Foto'}
                  </Text>
                </TouchableOpacity>
              )}

              {espacio.imagenes.length > 1 && (
                <View style={styles.indicadoresContenedor}>
                  {espacio.imagenes.map((_, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.indicadorPunto,
                        idx === imagenIndice && {
                          backgroundColor: colores.primario,
                          width: 20,
                        },
                      ]}
                      onPress={() => setImagenIndice(idx)}
                    />
                  ))}
                </View>
              )}
            </View>

            {/* Cabecera y Datos Principales */}
            <View style={[styles.seccionDetalle, { backgroundColor: colores.tarjeta }]}>
              <Text style={[styles.nombreEspacio, { color: colores.texto }]}>
                {espacio.nombre}
              </Text>
              <Text style={[styles.complejo, { color: colores.textoSecundario }]}>
                {espacio.complejo} · Villaguay, Entre Ríos
              </Text>

              {/* Insignias de características */}
              <View style={styles.insigniasFila}>
                <View style={[styles.badge, { backgroundColor: colores.chipFondo }]}>
                  <Icono nombre="tennisball-outline" tamano={14} color={colores.primario} />
                  <Text style={[styles.badgeTexto, { color: colores.texto }]}>
                    {espacio.superficie}
                  </Text>
                </View>

                <View style={[styles.badge, { backgroundColor: colores.chipFondo }]}>
                  <Icono
                    nombre={espacio.techado ? 'umbrella-outline' : 'cloud-outline'}
                    tamano={14}
                    color={colores.primario}
                  />
                  <Text style={[styles.badgeTexto, { color: colores.texto }]}>
                    {espacio.techado ? 'Techado' : 'Al aire libre'}
                  </Text>
                </View>

                {espacio.iluminacion && (
                  <View style={[styles.badge, { backgroundColor: colores.chipFondo }]}>
                    <Icono nombre="flash-outline" tamano={14} color={colores.advertencia} />
                    <Text style={[styles.badgeTexto, { color: colores.texto }]}>
                      Iluminación
                    </Text>
                  </View>
                )}

                <View style={[styles.badge, { backgroundColor: colores.chipFondo }]}>
                  <Icono nombre="people-outline" tamano={14} color={colores.primario} />
                  <Text style={[styles.badgeTexto, { color: colores.texto }]}>
                    Máx {espacio.capacidad} personas
                  </Text>
                </View>
              </View>

              <View style={[styles.precioFila, { borderTopColor: colores.borde }]}>
                <Text style={[styles.precioLabel, { color: colores.textoSecundario }]}>
                  Tarifa por hora:
                </Text>
                <Text style={[styles.precioValor, { color: colores.primario }]}>
                  ${espacio.precioPorHora.toLocaleString('es-AR')}
                </Text>
              </View>
            </View>

            {/* Video del espacio (expo-video) */}
            <View
              style={[styles.seccionDetalle, { backgroundColor: colores.tarjeta, marginTop: 14 }]}
            >
              <Text style={[styles.tituloSeccion, { color: colores.texto }]}>
                Video de la Cancha
              </Text>
              <ReproductorCancha videoUrl={espacio.videoUrl} />
            </View>

            {/* Reglamento de uso */}
            <View
              style={[styles.seccionDetalle, { backgroundColor: colores.tarjeta, marginTop: 14 }]}
            >
              <Text style={[styles.tituloSeccion, { color: colores.texto }]}>
                Reglamento y Condiciones
              </Text>
              <View style={styles.reglasCaja}>
                <Icono nombre="document-text-outline" tamano={20} color={colores.primario} />
                <Text style={[styles.reglasTexto, { color: colores.texto }]}>
                  {espacio.reglas}
                </Text>
              </View>
              <Text style={[styles.reglaAviso, { color: colores.textoSecundario }]}>
                • Cancelaciones permitidas hasta 4 horas antes del inicio del turno.
                {'\n'}• Presentar el código QR de reserva en la entrada para el ingreso.
              </Text>
            </View>
          </ScrollView>

          {/* Barra de acción inferior fija */}
          <View
            style={[
              styles.barraInferior,
              {
                backgroundColor: colores.tarjeta,
                borderTopColor: colores.borde,
                paddingBottom: insets.bottom > 0
                  ? insets.bottom + (Platform.OS === 'android' ? 16 : 12)
                  : (Platform.OS === 'android' ? 56 : 14),
              },
            ]}
          >
            <View>
              <Text style={[styles.precioBarraLabel, { color: colores.textoSecundario }]}>
                Precio por turno:
              </Text>
              <Text style={[styles.precioBarraValor, { color: colores.primario }]}>
                ${espacio.precioPorHora.toLocaleString('es-AR')}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.botonTurnos, { backgroundColor: colores.primario }]}
              onPress={() => router.push(`/espacio/${espacio.id}/turnos`)}
              activeOpacity={0.85}
            >
              <Text style={styles.botonTurnosTexto}>Ver Disponibilidad</Text>
              <Icono nombre="calendar" tamano={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </EstadoPantalla>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scrollContenido: {
    paddingBottom: 100,
  },
  galeriaContenedor: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  imagenHero: {
    width: '100%',
    height: '100%',
  },
  botonFavoritoFlotante: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  botonAgregarFotoFlotante: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  botonAgregarFotoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  indicadoresContenedor: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  indicadorPunto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  seccionDetalle: {
    padding: 18,
    borderRadius: 16,
    marginHorizontal: 14,
    marginTop: 14,
  },
  nombreEspacio: {
    fontSize: 20,
    fontWeight: '800',
  },
  complejo: {
    fontSize: 13,
    marginTop: 2,
  },
  insigniasFila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  precioFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  precioLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  precioValor: {
    fontSize: 20,
    fontWeight: '800',
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  reglasCaja: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reglasTexto: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    fontWeight: '500',
  },
  reglaAviso: {
    fontSize: 12,
    lineHeight: 18,
  },
  barraInferior: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  precioBarraLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  precioBarraValor: {
    fontSize: 20,
    fontWeight: '800',
  },
  botonTurnos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  botonTurnosTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
