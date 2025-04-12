import 'package:cloud_firestore/cloud_firestore.dart';

class Tutor {
  final String? id;
  final String fullName;
  final String email;
  final String password;
  final String gender;
  final String expertise;
  final String aboutMe;
  final String imageUrl;

  Tutor({
    this.id,
    required this.fullName,
    required this.email,
    required this.password,
    required this.gender,
    required this.expertise,
    required this.aboutMe,
    required this.imageUrl,
  });

  factory Tutor.fromMap(Map<String, dynamic> map, {String? documentId}) {
    return Tutor(
      id: documentId,
      fullName: map['fullName'] ?? '',
      email: map['email'] ?? '',
      password: map['password'] ?? '',
      gender: map['gender'] ?? '',
      expertise: map['expertise'] ?? '',
      aboutMe: map['aboutMe'] ?? '',
      imageUrl: map['imageUrl'] ?? '',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'fullName': fullName,
      'email': email,
      'password': password,
      'gender': gender,
      'expertise': expertise,
      'aboutMe': aboutMe,
      'imageUrl': imageUrl,
    };
  }

  Tutor copyWith({
    String? id,
    String? fullName,
    String? email,
    String? password,
    String? gender,
    String? expertise,
    String? aboutMe,
    String? imageUrl,
  }) {
    return Tutor(
      id: id ?? this.id,
      fullName: fullName ?? this.fullName,
      email: email ?? this.email,
      password: password ?? this.password,
      gender: gender ?? this.gender,
      expertise: expertise ?? this.expertise,
      aboutMe: aboutMe ?? this.aboutMe,
      imageUrl: imageUrl ?? this.imageUrl,
    );
  }
} 