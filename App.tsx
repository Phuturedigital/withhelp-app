import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  Navigation,
  ShieldCheck,
  TimerReset,
  UserRound,
  Users,
} from 'lucide-react-native';
const colors = {
  ink: '#111417',
  paper: '#f5f2ea',
  soft: '#e9e4d9',
  coral: '#ff6248',
  lime: '#c8f678',
  muted: '#686d69',
  white: '#ffffff',
  line: 'rgba(17,20,23,0.14)',
};

type Tab = 'home' | 'help' | 'circle' | 'me';
type ViewName = Tab | 'guardian' | 'countdown' | 'private';
type SheetName = 'start' | 'guardian-setup' | 'countdown-setup' | 'sos' | 'incident' | null;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <Text style={[styles.eyebrow, light && styles.eyebrowLight]}>{children}</Text>;
}

function Button({
  children,
  onPress,
  tone = 'ink',
  icon,
}: {
  children: React.ReactNode;
  onPress: () => void;
  tone?: 'ink' | 'lime' | 'outline' | 'coral';
  icon?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[`button_${tone}`], pressed && styles.pressed]}
    >
      <Text style={[styles.buttonText, tone === 'lime' && styles.buttonTextDark]}>{children}</Text>
      {icon}
    </Pressable>
  );
}

function SettingRow({ title, detail, value }: { title: string; detail: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.small}>{detail}</Text>
      </View>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
  );
}

function Header({ label, onBack }: { label?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable accessibilityLabel="Go back" hitSlop={12} onPress={onBack} style={styles.iconButton}>
          <ArrowLeft color={colors.ink} size={22} />
        </Pressable>
      ) : (
        <Text style={styles.logo}>WITH<Text style={styles.logoDot}>.</Text></Text>
      )}
      {label ? <Text style={styles.demoPill}>{label}</Text> : <View style={styles.avatar}><Text style={styles.avatarText}>W</Text></View>}
    </View>
  );
}

function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: ShieldCheck, eyebrow: 'Safety, with you', title: 'Protection starts before the emergency.', body: 'Prepare a journey or vulnerable moment, then keep the people and help you trust within reach.' },
    { icon: MapPin, eyebrow: 'Your control', title: 'Location has one clear purpose.', body: 'WITH. should use location during active protection, not create a permanent history of ordinary movement.' },
    { icon: Users, eyebrow: 'Trusted Circle', title: 'Start with one person.', body: 'Choose who can receive journey updates and emergency escalation. Continuous tracking stays off by default.' },
  ];
  const current = steps[step]!;
  const Icon = current.icon;

  return (
    <SafeAreaView style={styles.onboarding}>
      <StatusBar style="light" />
      <View style={styles.onboardingTop}>
        <Text style={styles.logoLight}>WITH<Text style={styles.logoDot}>.</Text></Text>
        <Text style={styles.stepCount}>{step + 1} / {steps.length}</Text>
      </View>
      <View style={styles.onboardingBody}>
        <View style={styles.onboardingIcon}><Icon color={colors.ink} size={38} /></View>
        <Eyebrow light>{current.eyebrow}</Eyebrow>
        <Text style={styles.onboardingTitle}>{current.title}</Text>
        <Text style={styles.onboardingText}>{current.body}</Text>
      </View>
      <Button
        tone="lime"
        onPress={() => step === steps.length - 1 ? onDone() : setStep(step + 1)}
        icon={<ArrowRight color={colors.ink} size={20} />}
      >
        {step === steps.length - 1 ? 'Explore the app' : 'Continue'}
      </Button>
      <Text style={styles.prototypeNote}>App preview. Emergency response connects at launch.</Text>
    </SafeAreaView>
  );
}

function HomeScreen({ openSheet, setView }: { openSheet: (sheet: SheetName) => void; setView: (view: ViewName) => void }) {
  return (
    <>
      <Header />
      <Eyebrow>Good afternoon</Eyebrow>
      <Text style={styles.title}>You are ready.</Text>
      <Text style={styles.body}>Start protection whenever a moment feels vulnerable. You do not need to wait until something is wrong.</Text>
      <View style={styles.readiness}>
        <View style={styles.statusLine}><View style={styles.statusDot} /><Eyebrow light>Protection readiness</Eyebrow></View>
        <Text style={styles.readinessTitle}>Good</Text>
        <Text style={styles.readinessText}>Location, notifications and your Trusted Circle are ready.</Text>
      </View>
      <Button onPress={() => openSheet('start')} icon={<ArrowRight color={colors.white} size={20} />}>Start protection</Button>
      <View style={styles.quickGrid}>
        <QuickAction icon={<Clock3 size={22} color={colors.ink} />} title="10 min check in" onPress={() => openSheet('countdown-setup')} />
        <QuickAction icon={<ShieldCheck size={22} color={colors.ink} />} title="Private Risk" onPress={() => setView('private')} />
        <QuickAction icon={<MapPin size={22} color={colors.ink} />} title="Nearby help" onPress={() => setView('help')} />
        <QuickAction icon={<Users size={22} color={colors.ink} />} title="Trusted Circle" onPress={() => setView('circle')} />
      </View>
      <View style={styles.historyRow}>
        <View><Text style={styles.settingTitle}>Rosebank to Home</Text><Text style={styles.small}>Completed safely · Yesterday</Text></View>
        <ChevronRight color={colors.ink} size={20} />
      </View>
    </>
  );
}

function QuickAction({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
      <View style={styles.quickIcon}>{icon}</View><Text style={styles.quickTitle}>{title}</Text>
    </Pressable>
  );
}

function GuardianScreen({ onBack, onHelp }: { onBack: () => void; onHelp: () => void }) {
  return (
    <>
      <Header label="GUARDIAN" onBack={onBack} />
      <View style={styles.activePanel}>
        <View style={styles.statusLine}><View style={styles.statusDot} /><Eyebrow light>Guardian active</Eyebrow></View>
        <Text style={styles.activeTitle}>You are being watched over.</Text>
        <Text style={styles.readinessText}>Home · expected arrival 18:42</Text>
        <View style={styles.route}><View style={styles.routeDot} /><View style={styles.routeLine} /><View style={styles.routeDot} /></View>
      </View>
      <View style={styles.statGrid}>
        {['Connection|Online', 'Heartbeat|Now', 'Trusted Circle|2 ready', 'Nearby help|3 points'].map((item) => {
          const [label, value] = item.split('|');
          return <View style={styles.stat} key={item}><Text style={styles.small}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>;
        })}
      </View>
      <Button tone="lime" onPress={onBack} icon={<Check color={colors.ink} size={20} />}>I arrived safely</Button>
      <Button tone="outline" onPress={onHelp} icon={<MapPin color={colors.ink} size={20} />}>Find nearby help</Button>
    </>
  );
}

function CountdownScreen({ onBack }: { onBack: () => void }) {
  const [seconds, setSeconds] = useState(600);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <>
      <Header label="COUNTDOWN" onBack={onBack} />
      <View style={styles.centerCopy}><Eyebrow>WITH. is watching this moment</Eyebrow><Text style={styles.title}>Stay focused on where you are going.</Text></View>
      <View style={styles.timerRing}><Text style={styles.timerText}>{clock}</Text><Text style={styles.small}>remaining</Text></View>
      <SettingRow title="Trusted Circle" detail="Not notified unless the flow escalates" value="Ready" />
      <Button tone="lime" onPress={onBack}>I am safe</Button>
      <Button tone="outline" onPress={() => setSeconds((value) => value + 300)} icon={<TimerReset color={colors.ink} size={20} />}>Add 5 minutes</Button>
    </>
  );
}

function PrivateRiskScreen({ onBack }: { onBack: () => void }) {
  return (
    <>
      <Header label="PRIVATE" onBack={onBack} />
      <Eyebrow>Private Risk</Eyebrow><Text style={styles.title}>Prepare quietly.</Text>
      <Text style={styles.body}>Use this when you want extra support around someone you know. You choose when it is active.</Text>
      <Text style={styles.inputLabel}>Next check in</Text><TextInput accessibilityLabel="Next check in" style={styles.input} value="Tomorrow, 07:30" />
      <Text style={styles.inputLabel}>Safe place</Text><TextInput accessibilityLabel="Safe place" style={styles.input} value="Trusted place" />
      <View style={styles.settings}>
        <SettingRow title="Trusted Circle" detail="2 people configured" value="Ready" />
        <SettingRow title="Duress PIN" detail="Configured before an incident" value="Set" />
        <SettingRow title="Location sharing" detail="Only during active protection" value="On" />
        <SettingRow title="Identification pack" detail="Encrypted and locked" value="Ready" />
      </View>
      <Button onPress={onBack}>Preview Private Risk</Button>
      <Text style={styles.disclaimer}>This does not monitor a person or relationship.</Text>
    </>
  );
}

function HelpScreen() {
  const points = [
    ['Rosebank Pharmacy', 'Pharmacy · 420 m'],
    ['The Zone Security Desk', 'Security · 650 m'],
    ['Oxford Road Fuel Stop', 'Fuel station · 1.1 km'],
  ];
  return (
    <>
      <Header /><Eyebrow>Nearby help</Eyebrow><Text style={styles.title}>Places that know how to help.</Text>
      <Text style={styles.body}>Assistance Points are verified for process and current availability. They are not labelled safe.</Text>
      <View style={styles.map}><View style={[styles.mapRoad, styles.mapRoadOne]} /><View style={[styles.mapRoad, styles.mapRoadTwo]} /><MapPin style={styles.mapPinOne} fill={colors.coral} color={colors.ink} /><MapPin style={styles.mapPinTwo} fill={colors.lime} color={colors.ink} /></View>
      {points.map(([name, detail]) => <View style={styles.point} key={name}><View style={styles.pointTop}><View><Text style={styles.settingTitle}>{name}</Text><Text style={styles.small}>{detail}</Text></View><Text style={styles.staffed}>OPEN + STAFFED</Text></View><Text style={styles.pointNote}>Staff procedure verified. Status checked recently.</Text><Pressable style={styles.navigate}><Navigation size={17} color={colors.ink} /><Text style={styles.navigateText}>Navigate</Text></Pressable></View>)}
    </>
  );
}

function CircleScreen() {
  return <><Header /><Eyebrow>Trusted Circle</Eyebrow><Text style={styles.title}>Your people.</Text><Text style={styles.body}>They receive protected journey or escalation updates only when you choose.</Text><View style={styles.settings}><SettingRow title="Primary contact" detail="Journey and escalation updates" value="Ready" /><SettingRow title="Family contact" detail="Journey and escalation updates" value="Ready" /></View><View style={styles.settings}><SettingRow title="Only during protection" detail="No continuous background tracking" value="On" /><SettingRow title="Arrival updates" detail="Notify when a journey ends" value="On" /><SettingRow title="Emergency escalation" detail="Share incident link when needed" value="On" /></View></>;
}

function ReadinessScreen() {
  return <><Header /><Eyebrow>Readiness</Eyebrow><Text style={styles.title}>Keep the basics ready.</Text><Text style={styles.body}>WITH. should warn you when protection is degraded before you depend on it.</Text><View style={styles.settings}><SettingRow title="Location access" detail="During active protection" value="Ready" /><SettingRow title="Notifications" detail="Check ins and incident updates" value="Ready" /><SettingRow title="Trusted Circle" detail="2 people configured" value="Ready" /><SettingRow title="Watch" detail="Optional secondary path" value="Not paired" /></View><View style={styles.prototypeBox}><Text style={styles.settingTitle}>App preview</Text><Text style={styles.small}>Live tracking, dispatch and emergency response connect at launch.</Text></View></>;
}

function BottomNav({ active, onChange, onSos }: { active: Tab; onChange: (tab: Tab) => void; onSos: () => void }) {
  const items = [{ key: 'home' as const, label: 'Home', Icon: Home }, { key: 'help' as const, label: 'Help', Icon: MapPin }, { key: 'circle' as const, label: 'Circle', Icon: Users }, { key: 'me' as const, label: 'Me', Icon: UserRound }];
  return (
    <View style={styles.navWrap}>
      <Pressable accessibilityLabel="Emergency SOS" onPress={onSos} style={styles.sosButton}><Text style={styles.sosText}>SOS</Text></Pressable>
      <View style={styles.bottomNav}>{items.map(({ key, label, Icon }) => <Pressable key={key} onPress={() => onChange(key)} style={styles.navItem}><Icon size={21} color={active === key ? colors.ink : colors.muted} strokeWidth={active === key ? 2.6 : 2} /><Text style={[styles.navLabel, active === key && styles.navLabelActive]}>{label}</Text></Pressable>)}</View>
    </View>
  );
}

function ActionSheet({ sheet, onClose, setSheet, setView }: { sheet: SheetName; onClose: () => void; setSheet: (sheet: SheetName) => void; setView: (view: ViewName) => void }) {
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startHold = () => { holdTimer.current = setTimeout(() => setSheet('incident'), 1200); };
  const endHold = () => { if (holdTimer.current) clearTimeout(holdTimer.current); };
  const choose = (view: ViewName) => { onClose(); setView(view); };
  return (
    <Modal visible={sheet !== null} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalShade} onPress={onClose} />
      <View style={[styles.sheet, (sheet === 'sos' || sheet === 'incident') && styles.sheetDark]}>
        <View style={styles.handle} />
        {sheet === 'start' && <><Eyebrow>Start protection</Eyebrow><Text style={styles.sheetTitle}>What are you doing?</Text><Text style={styles.body}>Choose the closest match. The protection engine stays the same underneath.</Text><SheetChoice title="Going somewhere" detail="Walk, drive or public transport" onPress={() => setSheet('guardian-setup')} /><SheetChoice title="Taking a ride" detail="Uber, Bolt, taxi or another ride" onPress={() => setSheet('guardian-setup')} /><SheetChoice title="Short vulnerable moment" detail="Watch me for a few minutes" onPress={() => setSheet('countdown-setup')} /><SheetChoice title="Private Risk" detail="Prepare around someone you know" onPress={() => choose('private')} /></>}
        {sheet === 'guardian-setup' && <><Eyebrow>Guardian journey</Eyebrow><Text style={styles.sheetTitle}>Protect this journey.</Text><Text style={styles.inputLabel}>Destination</Text><TextInput style={styles.input} value="Home" /><SettingRow title="Trusted Circle" detail="2 people configured" value="Ready" /><Button tone="lime" onPress={() => choose('guardian')}>Start Guardian</Button><Text style={styles.disclaimer}>App preview. No live location is sent.</Text></>}
        {sheet === 'countdown-setup' && <><Eyebrow>Safety Countdown</Eyebrow><Text style={styles.sheetTitle}>How long should WITH. watch?</Text><View style={styles.durationRow}>{['5', '10', '15', '30'].map((minute) => <View key={minute} style={[styles.duration, minute === '10' && styles.durationActive]}><Text style={styles.durationText}>{minute} min</Text></View>)}</View><SettingRow title="If you do not check in" detail="WITH. will ask if you are okay before escalating" value="Ready" /><Button tone="lime" onPress={() => choose('countdown')}>Start 10 minute countdown</Button></>}
        {sheet === 'sos' && <><Eyebrow>Emergency SOS</Eyebrow><Text style={styles.sheetTitleLight}>Hold to start an incident.</Text><Text style={styles.sheetBodyLight}>This stays separate from normal navigation.</Text><Pressable accessibilityRole="button" accessibilityLabel="Hold to start SOS" onPressIn={startHold} onPressOut={endHold} style={styles.holdButton}><Text style={styles.holdText}>HOLD SOS</Text></Pressable><Button tone="outline" onPress={onClose}>Cancel</Button><Text style={styles.sheetDisclaimer}>App preview. No alert will be sent.</Text></>}
        {sheet === 'incident' && <><Eyebrow>Incident preview</Eyebrow><Text style={styles.sheetTitleLight}>Help flow started.</Text><Text style={styles.sheetBodyLight}>At launch, the incident remains on the server even if the phone disappears.</Text><View style={styles.incidentBox}><Text style={styles.incidentTitle}>Incident created</Text><Text style={styles.sheetBodyLight}>Trusted Circle and professional response would start in parallel.</Text></View><Button tone="lime" onPress={onClose}>Close preview</Button></>}
      </View>
    </Modal>
  );
}

function SheetChoice({ title, detail, onPress }: { title: string; detail: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.sheetChoice, pressed && styles.pressed]}><View><Text style={styles.settingTitle}>{title}</Text><Text style={styles.small}>{detail}</Text></View><ChevronRight size={20} color={colors.ink} /></Pressable>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular: require('./assets/fonts/DMSans_400Regular.ttf'),
    DMSans_500Medium: require('./assets/fonts/DMSans_500Medium.ttf'),
    DMSans_700Bold: require('./assets/fonts/DMSans_700Bold.ttf'),
  });
  const [onboarded, setOnboarded] = useState(false);
  const [view, setView] = useState<ViewName>('home');
  const [sheet, setSheet] = useState<SheetName>(null);
  if (!fontsLoaded) return <View style={styles.loading} />;
  if (!onboarded) return <Onboarding onDone={() => setOnboarded(true)} />;
  const tab: Tab = view === 'guardian' || view === 'countdown' || view === 'private' ? 'home' : view;
  const showNav = view === 'home' || view === 'help' || view === 'circle' || view === 'me';
  const goHome = () => setView('home');

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="dark" /><NativeStatusBar backgroundColor={colors.paper} />
      <ScrollView contentContainerStyle={[styles.screen, !showNav && styles.screenWithoutNav]} keyboardShouldPersistTaps="handled">
        {view === 'home' && <HomeScreen openSheet={setSheet} setView={setView} />}
        {view === 'guardian' && <GuardianScreen onBack={goHome} onHelp={() => setView('help')} />}
        {view === 'countdown' && <CountdownScreen onBack={goHome} />}
        {view === 'private' && <PrivateRiskScreen onBack={goHome} />}
        {view === 'help' && <HelpScreen />}
        {view === 'circle' && <CircleScreen />}
        {view === 'me' && <ReadinessScreen />}
      </ScrollView>
      {showNav && <BottomNav active={tab} onChange={setView} onSos={() => setSheet('sos')} />}
      {!showNav && <Pressable accessibilityLabel="Emergency SOS" onPress={() => setSheet('sos')} style={styles.floatingSos}><Text style={styles.sosText}>SOS</Text></Pressable>}
      <ActionSheet sheet={sheet} onClose={() => setSheet(null)} setSheet={setSheet} setView={setView} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.paper }, app: { flex: 1, backgroundColor: colors.paper }, screen: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 130 }, screenWithoutNav: { paddingBottom: 92 },
  header: { minHeight: 48, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, logo: { fontFamily: 'DMSans_700Bold', fontSize: 26, color: colors.ink }, logoLight: { fontFamily: 'DMSans_700Bold', fontSize: 28, color: colors.white }, logoDot: { color: colors.coral }, avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.ink }, avatarText: { color: colors.white, fontFamily: 'DMSans_700Bold' }, iconButton: { width: 42, height: 42, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', borderRadius: 21 }, demoPill: { color: colors.white, backgroundColor: colors.ink, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6, fontFamily: 'DMSans_700Bold', fontSize: 10 },
  eyebrow: { color: colors.muted, fontFamily: 'DMSans_700Bold', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.1 }, eyebrowLight: { color: colors.lime }, title: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 39, lineHeight: 41, marginTop: 8, marginBottom: 12 }, body: { color: colors.muted, fontFamily: 'DMSans_400Regular', fontSize: 16, lineHeight: 23, marginBottom: 24 }, small: { color: colors.muted, fontFamily: 'DMSans_400Regular', fontSize: 12, lineHeight: 17 },
  readiness: { backgroundColor: colors.ink, padding: 22, marginBottom: 16, borderRadius: 8 }, statusLine: { flexDirection: 'row', alignItems: 'center', gap: 9 }, statusDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.lime }, readinessTitle: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 34, marginTop: 20 }, readinessText: { color: '#c9cdca', fontFamily: 'DMSans_400Regular', fontSize: 14 },
  button: { minHeight: 54, marginTop: 10, paddingHorizontal: 18, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1 }, button_ink: { backgroundColor: colors.ink, borderColor: colors.ink }, button_lime: { backgroundColor: colors.lime, borderColor: colors.lime }, button_outline: { backgroundColor: 'transparent', borderColor: colors.ink }, button_coral: { backgroundColor: colors.coral, borderColor: colors.coral }, buttonText: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 15 }, buttonTextDark: { color: colors.ink }, pressed: { opacity: 0.72 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 }, quickAction: { width: '48.5%', minHeight: 126, padding: 15, backgroundColor: colors.soft, justifyContent: 'space-between', borderRadius: 6 }, quickIcon: { width: 40, height: 40, backgroundColor: colors.white, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }, quickTitle: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 15 }, historyRow: { marginTop: 22, paddingVertical: 18, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  activePanel: { backgroundColor: colors.ink, padding: 22, borderRadius: 8 }, activeTitle: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 36, lineHeight: 38, marginTop: 22, marginBottom: 12 }, route: { flexDirection: 'row', alignItems: 'center', marginTop: 28 }, routeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.lime }, routeLine: { flex: 1, height: 2, backgroundColor: '#ffffff44' }, statGrid: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 14, borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.line }, stat: { width: '50%', minHeight: 78, padding: 14, borderRightWidth: 1, borderBottomWidth: 1, borderColor: colors.line }, statValue: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 17, marginTop: 6 }, centerCopy: { alignItems: 'center' }, timerRing: { width: 230, height: 230, borderRadius: 115, alignSelf: 'center', marginVertical: 28, borderWidth: 12, borderColor: colors.lime, alignItems: 'center', justifyContent: 'center' }, timerText: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 48 },
  settings: { borderTopWidth: 1, borderColor: colors.line, marginBottom: 18 }, settingRow: { minHeight: 72, paddingVertical: 14, borderBottomWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 }, settingCopy: { flex: 1 }, settingTitle: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 15 }, settingValue: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 12 }, inputLabel: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 12, marginBottom: 7 }, input: { minHeight: 52, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 5, paddingHorizontal: 14, color: colors.ink, fontFamily: 'DMSans_500Medium', marginBottom: 17 }, disclaimer: { color: colors.muted, fontFamily: 'DMSans_400Regular', textAlign: 'center', fontSize: 11, marginTop: 10 },
  map: { height: 180, backgroundColor: '#dce3d3', borderRadius: 6, overflow: 'hidden', marginBottom: 16, position: 'relative' }, mapRoad: { position: 'absolute', height: 20, width: '130%', backgroundColor: colors.white }, mapRoadOne: { top: 74, left: -30, transform: [{ rotate: '-12deg' }] }, mapRoadTwo: { top: 62, left: -55, transform: [{ rotate: '62deg' }] }, mapPinOne: { position: 'absolute', left: '30%', top: 38 }, mapPinTwo: { position: 'absolute', right: '22%', bottom: 28 }, point: { paddingVertical: 18, borderTopWidth: 1, borderColor: colors.line }, pointTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, staffed: { color: colors.ink, backgroundColor: '#e2f3c8', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 10, fontFamily: 'DMSans_700Bold', fontSize: 9, alignSelf: 'flex-start' }, pointNote: { color: colors.muted, fontFamily: 'DMSans_400Regular', fontSize: 12, marginVertical: 12 }, navigate: { minHeight: 42, borderWidth: 1, borderColor: colors.ink, borderRadius: 5, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }, navigateText: { fontFamily: 'DMSans_700Bold', color: colors.ink }, prototypeBox: { backgroundColor: colors.soft, padding: 18, borderLeftWidth: 4, borderLeftColor: colors.coral },
  navWrap: { position: 'absolute', left: 0, right: 0, bottom: 0 }, bottomNav: { minHeight: 78, paddingBottom: 8, backgroundColor: colors.white, borderTopWidth: 1, borderColor: colors.line, flexDirection: 'row' }, navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }, navLabel: { color: colors.muted, fontFamily: 'DMSans_500Medium', fontSize: 10 }, navLabelActive: { color: colors.ink, fontFamily: 'DMSans_700Bold' }, sosButton: { zIndex: 2, position: 'absolute', right: 18, bottom: 90, width: 58, height: 58, borderRadius: 29, backgroundColor: colors.coral, borderWidth: 4, borderColor: colors.paper, alignItems: 'center', justifyContent: 'center' }, floatingSos: { position: 'absolute', right: 18, bottom: 20, width: 58, height: 58, borderRadius: 29, backgroundColor: colors.coral, borderWidth: 4, borderColor: colors.paper, alignItems: 'center', justifyContent: 'center' }, sosText: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 12 },
  onboarding: { flex: 1, backgroundColor: colors.ink, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 22 }, onboardingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, stepCount: { color: '#aeb3af', fontFamily: 'DMSans_700Bold', fontSize: 12 }, onboardingBody: { flex: 1, justifyContent: 'center' }, onboardingIcon: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }, onboardingTitle: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 43, lineHeight: 45, marginTop: 12, marginBottom: 18 }, onboardingText: { color: '#c9cdca', fontFamily: 'DMSans_400Regular', fontSize: 17, lineHeight: 25 }, prototypeNote: { color: '#8f9591', fontFamily: 'DMSans_400Regular', fontSize: 11, textAlign: 'center', marginTop: 14 },
  modalShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.48)' }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '86%', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30, backgroundColor: colors.paper, borderTopLeftRadius: 18, borderTopRightRadius: 18 }, sheetDark: { backgroundColor: colors.ink }, handle: { width: 42, height: 4, borderRadius: 2, backgroundColor: '#8d918e', alignSelf: 'center', marginBottom: 22 }, sheetTitle: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 30, marginTop: 7, marginBottom: 9 }, sheetTitleLight: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 30, marginTop: 7, marginBottom: 9 }, sheetBodyLight: { color: '#bec3bf', fontFamily: 'DMSans_400Regular', fontSize: 15, lineHeight: 22, marginBottom: 18 }, sheetChoice: { minHeight: 66, paddingVertical: 12, borderTopWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, durationRow: { flexDirection: 'row', gap: 8, marginVertical: 18 }, duration: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line, borderRadius: 5 }, durationActive: { backgroundColor: colors.ink }, durationText: { fontFamily: 'DMSans_700Bold', fontSize: 12, color: colors.muted }, holdButton: { width: 190, height: 190, borderRadius: 95, alignSelf: 'center', marginVertical: 20, backgroundColor: colors.coral, borderWidth: 8, borderColor: '#ffffff18', alignItems: 'center', justifyContent: 'center' }, holdText: { color: colors.ink, fontFamily: 'DMSans_700Bold', fontSize: 18 }, sheetDisclaimer: { color: '#858b87', fontFamily: 'DMSans_400Regular', fontSize: 11, textAlign: 'center', marginTop: 12 }, incidentBox: { borderLeftWidth: 4, borderLeftColor: colors.coral, backgroundColor: '#ffffff0d', padding: 18, marginBottom: 15 }, incidentTitle: { color: colors.white, fontFamily: 'DMSans_700Bold', fontSize: 16, marginBottom: 6 },
});