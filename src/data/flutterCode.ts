import { FlutterFile } from '../types';

export const FLUTTER_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    language: 'yaml',
    description: 'Flutter project configuration file with Material 3, Google Fonts, and Firebase dependencies commented out.',
    content: `name: bhao_rate_checker
description: "Bhao - Service Rate Checker Lahore. Transparent service pricing & receipt verification app for Pakistan."
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.19.0
  google_fonts: ^6.1.0
  cupertino_icons: ^1.0.8

  # =============================================================
  # FIREBASE CONNECTION POINT:
  # Uncomment the lines below when connecting Firebase Firestore & Storage
  # =============================================================
  # firebase_core: ^3.1.0
  # cloud_firestore: ^5.0.1
  # firebase_storage: ^12.0.1
  # image_picker: ^1.1.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true

  # Asset declaration for custom fonts/images if added later
  # assets:
  #   - assets/images/logo.png
  #   - assets/images/placeholder_bill.png
`
  },
  {
    path: 'lib/main.dart',
    language: 'dart',
    description: 'Main application entry point with Material 3 Theme, Navigation Routes, and Localization configuration.',
    content: `import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';
import 'screens/rate_details_screen.dart';
import 'screens/submit_bill_screen.dart';
import 'l10n/app_strings.dart';

// =============================================================
// FIREBASE CONNECTION POINT:
// Import Firebase core here when initializing backend:
// import 'package:firebase_core/firebase_core.dart';
// import 'firebase_options.dart';
// =============================================================

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // =============================================================
  // FIREBASE INITIALIZATION:
  // Uncomment when firebase_options.dart is generated via FlutterFire CLI
  // await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );
  // =============================================================

  runApp(const BhaoApp());
}

class BhaoApp extends StatefulWidget {
  const BhaoApp({super.key});

  static void setLocale(BuildContext context, Locale newLocale) {
    _BhaoAppState? state = context.findAncestorStateOfType<_BhaoAppState>();
    state?.setLocale(newLocale);
  }

  @override
  State<BhaoApp> createState() => _BhaoAppState();
}

class _BhaoAppState extends State<BhaoApp> {
  Locale _locale = const Locale('en', 'US');

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bhao - Rate Checker Lahore',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      locale: _locale,
      supportedLocales: const [
        Locale('en', 'US'), // English
        Locale('ur', 'PK'), // Urdu (Ready for translation)
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/submit-bill': (context) => const SubmitBillScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/rate-details') {
          final args = settings.arguments as Map<String, dynamic>?;
          return MaterialPageRoute(
            builder: (context) => RateDetailsScreen(
              serviceId: args?['serviceId'] ?? 'ceiling-fan-repair',
              serviceTitle: args?['title'] ?? 'Ceiling Fan Repair',
            ),
          );
        }
        return null;
      },
    );
  }
}
`
  },
  {
    path: 'lib/theme/app_theme.dart',
    language: 'dart',
    description: 'Material 3 design system matching Bhao color specs (Navy #0F172A, Safety Green #22C55E, Soft Surface #F8FAFC).',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color primaryNavy = Color(0xFF0F172A);
  static const Color safetyGreen = Color(0xFF22C55E);
  static const Color alertRed = Color(0xFFEF4444);
  static const Color surfaceLight = Color(0xFFF8FAFC);
  static const Color cardWhite = Color(0xFFFFFFFF);
  static const Color textDark = Color(0xFF191C1E);
  static const Color textMuted = Color(0xFF64748B);
  static const Color borderOutline = Color(0xFFC6C6CD);
  static const Color greenLightContainer = Color(0xFFDCFCE7);
  static const Color redLightContainer = Color(0xFFFEE2E2);
}

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primaryNavy,
        primary: AppColors.primaryNavy,
        secondary: AppColors.safetyGreen,
        error: AppColors.alertRed,
        surface: AppColors.surfaceLight,
      ),
      scaffoldBackgroundColor: AppColors.surfaceLight,
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.inter(
          fontSize: 36,
          fontWeight: FontWeight.w800,
          color: AppColors.primaryNavy,
        ),
        headlineMedium: GoogleFonts.inter(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: AppColors.textDark,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: AppColors.textDark,
        ),
        labelLarge: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w700,
          color: AppColors.textDark,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.surfaceLight,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: AppColors.primaryNavy),
        titleTextStyle: TextStyle(
          color: AppColors.primaryNavy,
          fontSize: 20,
          fontWeight: FontWeight.w800,
        ),
      ),
      cardTheme: CardTheme(
        color: AppColors.cardWhite,
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.borderOutline, width: 0.8),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primaryNavy,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 54),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return lightTheme; // Falls back to consistent high-contrast light design per Bhao guidelines
  }
}
`
  },
  {
    path: 'lib/models/service_rate.dart',
    language: 'dart',
    description: 'Data models for Service Rates, Sub-Tasks, and Verified Receipts with Firestore serialization placeholders.',
    content: `class SubTask {
  final String id;
  final String name;
  final int minPrice;
  final int maxPrice;

  SubTask({
    required this.id,
    required this.name,
    required this.minPrice,
    required this.maxPrice,
  });

  factory SubTask.fromMap(Map<String, dynamic> map) {
    return SubTask(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      minPrice: (map['minPrice'] as num).toInt(),
      maxPrice: (map['maxPrice'] as num).toInt(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'minPrice': minPrice,
      'maxPrice': maxPrice,
    };
  }
}

class VerifiedReceipt {
  final String id;
  final String location;
  final String timeAgo;
  final int amountPaid;
  final bool isVerified;
  final String? notes;

  VerifiedReceipt({
    required this.id,
    required this.location,
    required this.timeAgo,
    required this.amountPaid,
    required this.isVerified,
    this.notes,
  });

  // =============================================================
  // FIREBASE CONNECTION POINT:
  // Convert Firestore DocumentSnapshot to VerifiedReceipt
  // =============================================================
  factory VerifiedReceipt.fromFirestore(Map<String, dynamic> data, String docId) {
    return VerifiedReceipt(
      id: docId,
      location: data['location'] ?? 'Lahore',
      timeAgo: data['timeAgo'] ?? 'Recently',
      amountPaid: (data['amountPaid'] as num).toInt(),
      isVerified: data['isVerified'] ?? true,
      notes: data['notes'],
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'location': location,
      'amountPaid': amountPaid,
      'isVerified': isVerified,
      'notes': notes,
      'createdAt': DateTime.now().toIso8601String(),
    };
  }
}

class ServiceRate {
  final String id;
  final String title;
  final String category;
  final int verifiedCount;
  final int fairPercentage;
  final int minPrice;
  final int maxPrice;
  final List<String> locations;
  final double gaugePosition;
  final List<SubTask> subTasks;
  final List<VerifiedReceipt> receipts;

  ServiceRate({
    required this.id,
    required this.title,
    required this.category,
    required this.verifiedCount,
    required this.fairPercentage,
    required this.minPrice,
    required this.maxPrice,
    required this.locations,
    required this.gaugePosition,
    required this.subTasks,
    required this.receipts,
  });
}
`
  },
  {
    path: 'lib/screens/home_screen.dart',
    language: 'dart',
    description: 'Home Screen featuring Lahore search, Category Chips, Bhao Gauge Indicator, and Rate Cards.',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/service_rate.dart';
import '../l10n/app_strings.dart';
import '../widgets/bhao_gauge.dart';

// =============================================================
// FIREBASE CONNECTION POINT:
// Connect Firebase Firestore to stream live rates:
// final Stream<QuerySnapshot> _ratesStream = 
//     FirebaseFirestore.instance.collection('services').snapshots();
// =============================================================

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedCategory = 'All';
  String _selectedLocation = 'Johar Town, Lahore';
  String _searchQuery = '';

  final List<String> _categories = [
    'All',
    'Electrician',
    'Plumber',
    'AC Repair',
    'Painter',
    'Appliance Fix',
    'Carpenter',
  ];

  final List<String> _locations = [
    'Johar Town, Lahore',
    'Gulberg, Lahore',
    'DHA Phase 1-8, Lahore',
    'Model Town, Lahore',
    'Faisal Town, Lahore',
    'Cantt, Lahore',
  ];

  // Mock static data ready to be swapped with Firebase Firestore stream
  final List<ServiceRate> _services = [
    ServiceRate(
      id: 'ceiling-fan-repair',
      title: 'Ceiling Fan Repair',
      category: 'Electrician',
      verifiedCount: 142,
      fairPercentage: 88,
      minPrice: 800,
      maxPrice: 1200,
      locations: ['Johar Town', 'Model Town', 'Gulberg'],
      gaugePosition: 0.45,
      subTasks: [
        SubTask(id: 's1', name: 'Capacitor Replacement', minPrice: 350, maxPrice: 500),
        SubTask(id: 's2', name: 'Bearing Replacement', minPrice: 700, maxPrice: 900),
        SubTask(id: 's3', name: 'Full Motor Rewinding', minPrice: 1200, maxPrice: 1600),
      ],
      receipts: [
        VerifiedReceipt(id: 'r1', location: 'Johar Town', timeAgo: '2 days ago', amountPaid: 900, isVerified: true),
        VerifiedReceipt(id: 'r2', location: 'Model Town', timeAgo: '5 days ago', amountPaid: 1500, isVerified: false),
      ],
    ),
    ServiceRate(
      id: 'ac-service-gas',
      title: 'AC Master Service & Gas Refill',
      category: 'AC Repair',
      verifiedCount: 289,
      fairPercentage: 84,
      minPrice: 2500,
      maxPrice: 4000,
      locations: ['Gulberg', 'DHA Phase 6'],
      gaugePosition: 0.50,
      subTasks: [],
      receipts: [],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final filteredServices = _services.where((s) {
      final matchesCategory = _selectedCategory == 'All' || s.category == _selectedCategory;
      final matchesSearch = s.title.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.location_on, color: AppColors.primaryNavy, size: 20),
            const SizedBox(width: 4),
            DropdownButton<String>(
              value: _selectedLocation,
              underline: const SizedBox(),
              icon: const Icon(Icons.arrow_drop_down, color: AppColors.primaryNavy),
              style: const TextStyle(
                color: AppColors.primaryNavy,
                fontWeight: FontWeight.w600,
                fontSize: 15,
              ),
              items: _locations.map((loc) {
                return DropdownMenuItem(value: loc, child: Text(loc));
              }).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedLocation = val);
              },
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: AppColors.primaryNavy,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const CircleAvatar(
                    radius: 14,
                    backgroundColor: Colors.white,
                    child: Text(
                      'B',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: AppColors.primaryNavy,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 6),
                const Text(
                  'Bhao',
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 20,
                    color: AppColors.primaryNavy,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
            TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              decoration: InputDecoration(
                hintText: AppStrings.searchPlaceholder,
                prefixIcon: const Icon(Icons.search, color: AppColors.textMuted),
                filled: true,
                fillColor: AppColors.cardWhite,
                contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.borderOutline),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.borderOutline),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Category Chips
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _categories.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final cat = _categories[index];
                  final isSelected = cat == _selectedCategory;
                  return FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() => _selectedCategory = cat);
                    },
                    backgroundColor: AppColors.cardWhite,
                    selectedColor: AppColors.primaryNavy,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : AppColors.textDark,
                      fontWeight: FontWeight.bold,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                      side: BorderSide(
                        color: isSelected ? AppColors.primaryNavy : AppColors.borderOutline,
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),

            // Section Header
            Text(
              AppStrings.trendingRates,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 12),

            // Services List
            ...filteredServices.map((service) {
              return Card(
                margin: const EdgeInsets.only(bottom: 16),
                child: InkWell(
                  onTap: () {
                    Navigator.pushNamed(
                      context,
                      '/rate-details',
                      arguments: {
                        'serviceId': service.id,
                        'title': service.title,
                      },
                    );
                  },
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      // Status Bar Accent
                      Positioned(
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 6,
                        child: Container(
                          decoration: const BoxDecoration(
                            color: AppColors.safetyGreen,
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(16),
                              bottomLeft: Radius.circular(16),
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(18, 16, 16, 16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        service.title,
                                        style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        'Based on \${service.verifiedCount} verified receipts in Lahore',
                                        style: const TextStyle(
                                          color: AppColors.textMuted,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: AppColors.greenLightContainer,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.verified, size: 14, color: AppColors.safetyGreen),
                                      const SizedBox(width: 4),
                                      Text(
                                        '\${service.fairPercentage}% voted Fair',
                                        style: const TextStyle(
                                          color: Colors.green,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 16),
                            const Text(
                              'FAIR RATE RANGE',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: AppColors.textMuted,
                                letterSpacing: 1.1,
                              ),
                            ),
                            Text(
                              'PKR \${service.minPrice} - \${service.maxPrice}',
                              style: const TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.w900,
                                color: AppColors.primaryNavy,
                              ),
                            ),
                            const SizedBox(height: 12),

                            // Gauge Indicator
                            BhaoGauge(position: service.gaugePosition),
                            const SizedBox(height: 16),

                            // Voting Widget
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceLight,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                children: [
                                  const Text(
                                    'Was your rate fair?',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      Expanded(
                                        child: ElevatedButton.icon(
                                          onPressed: () {
                                            // FIREBASE CONNECTION POINT:
                                            // Vote Fair -> Increment Firestore counter
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              const SnackBar(content: Text('Thanks for voting Fair!')),
                                            );
                                          },
                                          icon: const Text('👍'),
                                          label: const Text('Fair'),
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: AppColors.greenLightContainer,
                                            foregroundColor: Colors.green[900],
                                            elevation: 0,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: OutlinedButton.icon(
                                          onPressed: () {
                                            // FIREBASE CONNECTION POINT:
                                            // Vote Overcharged -> Increment Firestore counter
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              const SnackBar(content: Text('Flagged as overcharged')),
                                            );
                                          },
                                          icon: const Text('👎'),
                                          label: const Text('Overcharged'),
                                          style: OutlinedButton.styleFrom(
                                            foregroundColor: AppColors.textDark,
                                            side: const BorderSide(color: AppColors.borderOutline),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/submit-bill');
        },
        backgroundColor: AppColors.primaryNavy,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add_a_photo),
        label: Text(AppStrings.uploadReceipt),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/rate_details_screen.dart',
    language: 'dart',
    description: 'Detailed service rate screen with sub-task price breakdown and verified receipt feed.',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/service_rate.dart';
import '../l10n/app_strings.dart';

class RateDetailsScreen extends StatelessWidget {
  final String serviceId;
  final String serviceTitle;

  const RateDetailsScreen({
    super.key,
    required this.serviceId,
    required this.serviceTitle,
  });

  @override
  Widget build(BuildContext context) {
    // =============================================================
    // FIREBASE CONNECTION POINT:
    // Fetch specific rate details & receipts stream from Firestore:
    // FirebaseFirestore.instance.collection('services').doc(serviceId)...
    // =============================================================

    final subTasks = [
      SubTask(id: '1', name: 'Capacitor Replacement', minPrice: 350, maxPrice: 500),
      SubTask(id: '2', name: 'Bearing Replacement', minPrice: 700, maxPrice: 900),
      SubTask(id: '3', name: 'Full Motor Rewinding', minPrice: 1200, maxPrice: 1600),
    ];

    final receipts = [
      VerifiedReceipt(id: 'r1', location: 'Johar Town', timeAgo: '2 days ago', amountPaid: 900, isVerified: true),
      VerifiedReceipt(id: 'r2', location: 'Model Town', timeAgo: '5 days ago', amountPaid: 1500, isVerified: false),
    ];

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(AppStrings.rateDetails),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              serviceTitle,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w900,
                color: AppColors.primaryNavy,
              ),
            ),
            const SizedBox(height: 4),
            Row(
              children: const [
                Icon(Icons.location_on, size: 16, color: AppColors.textMuted),
                SizedBox(width: 4),
                Text(
                  'Model Town / Johar Town',
                  style: TextStyle(
                    color: AppColors.textMuted,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Fair Range Banner Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Container(
                      width: 4,
                      height: 40,
                      color: AppColors.safetyGreen,
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'FAIR RANGE',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textMuted,
                          ),
                        ),
                        Text(
                          'PKR 800 – 1,200',
                          style: TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                            color: AppColors.primaryNavy,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Sub task breakdown
            Text(
              AppStrings.subTaskBreakdown,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 12),

            ...subTasks.map((st) {
              return Card(
                margin: const EdgeInsets.only(bottom: 8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        st.name,
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceLight,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          'PKR \${st.minPrice} – \${st.maxPrice}',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }),
            const SizedBox(height: 24),

            // Verified Receipts
            Text(
              AppStrings.recentVerifiedReceipts,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 12),

            ...receipts.map((r) {
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            '\${r.location} • \${r.timeAgo}',
                            style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                          ),
                          Icon(
                            r.isVerified ? Icons.verified : Icons.warning_amber_rounded,
                            color: r.isVerified ? AppColors.safetyGreen : AppColors.alertRed,
                            size: 20,
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Text('Paid ', style: TextStyle(fontSize: 15)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: r.isVerified ? AppColors.greenLightContainer : AppColors.redLightContainer,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'PKR \${r.amountPaid}',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: r.isVerified ? Colors.green[900] : AppColors.alertRed,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/submit_bill_screen.dart',
    language: 'dart',
    description: 'Submit Service Bill form matching Bhao spec with receipt camera capture, price rating toggle, and Firebase upload hooks.',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../l10n/app_strings.dart';

// =============================================================
// FIREBASE CONNECTION POINT:
// Import Firebase Storage & Firestore to upload bill image & metadata:
// import 'package:firebase_storage/firebase_storage.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
// =============================================================

class SubmitBillScreen extends StatefulWidget {
  const SubmitBillScreen({super.key});

  @override
  State<SubmitBillScreen> createState() => _SubmitBillScreenState();
}

class _SubmitBillScreenState extends State<SubmitBillScreen> {
  final _formKey = GlobalKey<FormState>();
  String _category = 'Electrician';
  String _location = 'Gulberg, Lahore';
  final _taskController = TextEditingController(text: 'Fan Repair & Capacitor Change');
  final _amountController = TextEditingController(text: '1000');
  String _pricingRating = 'fair'; // 'fair' or 'scam'
  bool _isSubmitting = false;

  final List<String> _categories = ['Electrician', 'Plumber', 'AC Repair', 'Carpenter', 'Painter'];
  final List<String> _locations = ['Gulberg, Lahore', 'DHA, Lahore', 'Johar Town, Lahore', 'Model Town, Lahore'];

  Future<void> _submitBill() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    // =============================================================
    // FIREBASE CONNECTION POINT:
    // 1. Upload receipt image to Firebase Storage:
    // Reference ref = FirebaseStorage.instance.ref().child('receipts/\${DateTime.now().millisecondsSinceEpoch}.jpg');
    // await ref.putFile(imageFile);
    // String imageUrl = await ref.getDownloadURL();
    //
    // 2. Save submission entry in Firestore:
    // await FirebaseFirestore.instance.collection('submitted_bills').add({
    //   'category': _category,
    //   'location': _location,
    //   'task': _taskController.text,
    //   'amountPaid': int.parse(_amountController.text),
    //   'rating': _pricingRating,
    //   'imageUrl': imageUrl,
    //   'submittedAt': FieldValue.serverTimestamp(),
    // });
    // =============================================================

    await Future.delayed(const Duration(seconds: 1)); // Simulated network latency

    if (!mounted) return;
    setState(() => _isSubmitting = false);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Receipt submitted anonymously! Thank you for contributing to market transparency.'),
        backgroundColor: AppColors.safetyGreen,
      ),
    );

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(AppStrings.submitBillTitle),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Photo Receipt Placeholder
              GestureDetector(
                onTap: () {
                  // FIREBASE CONNECTION POINT:
                  // Trigger ImagePicker to take photo of bill
                },
                child: Container(
                  height: 180,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppColors.cardWhite,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: AppColors.borderOutline,
                      style: BorderStyle.solid,
                      width: 1.5,
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.photo_camera, size: 48, color: AppColors.primaryNavy),
                      SizedBox(height: 8),
                      Text(
                        'Take a photo of your receipt/bill',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: AppColors.textDark,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Category Dropdown
              const Text('Category', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                value: _category,
                decoration: const InputDecoration(border: OutlineInputBorder()),
                items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (v) => setState(() => _category = v!),
              ),
              const SizedBox(height: 16),

              // Location Dropdown
              const Text('Location', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                value: _location,
                decoration: const InputDecoration(border: OutlineInputBorder()),
                items: _locations.map((l) => DropdownMenuItem(value: l, child: Text(l))).toList(),
                onChanged: (v) => setState(() => _location = v!),
              ),
              const SizedBox(height: 16),

              // Specific Task Textfield
              const Text('Specific Task', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _taskController,
                decoration: const InputDecoration(
                  hintText: 'e.g. Fan Repair & Capacitor Change',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),

              // Total Paid Textfield
              const Text('Total Paid', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              TextFormField(
                controller: _amountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  prefixText: 'PKR  ',
                  prefixStyle: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textDark),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),

              // Pricing Rating
              const Text('How was the pricing?', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _pricingRating = 'fair'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: _pricingRating == 'fair' ? AppColors.greenLightContainer : AppColors.cardWhite,
                          border: Border.all(
                            color: _pricingRating == 'fair' ? AppColors.safetyGreen : AppColors.borderOutline,
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          children: const [
                            Text('👍', style: TextStyle(fontSize: 28)),
                            SizedBox(height: 4),
                            Text('Fair & Standard Rate', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _pricingRating = 'scam'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: _pricingRating == 'scam' ? AppColors.redLightContainer : AppColors.cardWhite,
                          border: Border.all(
                            color: _pricingRating == 'scam' ? AppColors.alertRed : AppColors.borderOutline,
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          children: const [
                            Text('👎', style: TextStyle(fontSize: 28)),
                            SizedBox(height: 4),
                            Text('Overcharged / Scam', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Submit Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitBill,
                  child: _isSubmitting
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                        )
                      : Text(AppStrings.submitAnonymously),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/widgets/bhao_gauge.dart',
    language: 'dart',
    description: 'Custom Bhao Gauge Indicator Widget showing Cheap / Fair / High spectrum with animated needle.',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class BhaoGauge extends StatelessWidget {
  final double position; // 0.0 to 1.0

  const BhaoGauge({super.key, required this.position});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Bar Spectrum
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: SizedBox(
            height: 8,
            child: Row(
              children: [
                Expanded(
                  child: Container(color: Colors.blue[300]), // Cheap
                ),
                Expanded(
                  child: Container(color: AppColors.greenLightContainer), // Fair
                ),
                Expanded(
                  child: Container(color: AppColors.redLightContainer), // High
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 4),

        // Pointer & Labels
        Stack(
          children: [
            Align(
              alignment: FractionalOffset(position.clamp(0.05, 0.95), 0),
              child: Container(
                width: 3,
                height: 12,
                color: AppColors.primaryNavy,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text('Cheap', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
            Text('Fair', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.textDark)),
            Text('High', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
          ],
        ),
      ],
    );
  }
}
`
  },
  {
    path: 'lib/l10n/app_strings.dart',
    language: 'dart',
    description: 'English strings ready for Urdu translation (i18n ready).',
    content: `class AppStrings {
  static const String appTitle = 'Bhao - Rate Checker Lahore';
  static const String searchPlaceholder = 'Search service (e.g. Fan repair, Plumber, AC service)';
  static const String trendingRates = 'Trending Rates';
  static const String fairRateRange = 'FAIR RATE RANGE';
  static const String wasRateFair = 'Was your rate fair?';
  static const String fair = 'Fair';
  static const String overcharged = 'Overcharged';
  static const String uploadReceipt = 'Upload Receipt';
  static const String submitBillTitle = 'Submit Service Bill';
  static const String rateDetails = 'Rate Details';
  static const String subTaskBreakdown = 'Sub-Task Breakdown';
  static const String recentVerifiedReceipts = 'Recent Verified Receipts';
  static const String submitAnonymously = 'Submit Anonymously';

  // Urdu Translations map ready for Locale switching
  static const Map<String, String> urduMap = {
    appTitle: 'بھاؤ - ریٹ چیکر لاہور',
    searchPlaceholder: 'سروس تلاش کریں (مثلاً پنکھا مرمت، پلمبر)',
    trendingRates: 'مقبول ترین نرخ',
    fairRateRange: 'مناسب ریٹ رینج',
    wasRateFair: 'کیا آپ کا ریٹ مناسب تھا؟',
    fair: 'مناسب',
    overcharged: 'زیادہ پیسے لیے',
    uploadReceipt: 'رسید اپ لوڈ کریں',
    submitBillTitle: 'سروس بل جمع کرائیں',
    rateDetails: 'ریٹ کی تفصیلات',
    subTaskBreakdown: 'ذیلی کاموں کی تفصیل',
    recentVerifiedReceipts: 'حالیہ تصدیق شدہ رسیدیں',
    submitAnonymously: 'گمنام طور پر جمع کرائیں',
  };
}
`
  }
];
