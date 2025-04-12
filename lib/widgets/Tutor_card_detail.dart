import 'package:flutter/material.dart';
import 'package:supply_on_campus/models/Tutor.dart';
import 'package:supply_on_campus/service/Tutor/TutorRequestService.dart';
import 'package:firebase_auth/firebase_auth.dart';

class TutorCardDetail extends StatelessWidget {
  final Tutor tutor;
  final _auth = FirebaseAuth.instance;

  TutorCardDetail({super.key, required this.tutor});

  Future<void> _bookSession(BuildContext context) async {
    try {
      // Get current user
      final User? currentUser = _auth.currentUser;

      if (currentUser == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Please login to book a session'),
            backgroundColor: Colors.red,
          ),
        );
        return;
      }

      // Show booking dialog
      final bool? shouldBook = await showDialog<bool>(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Confirm Booking'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Tutor: ${tutor.fullName}'),
                const SizedBox(height: 8),
                Text('Subject: ${tutor.expertise}'),
                const SizedBox(height: 16),
                const Text('Would you like to book a session with this tutor?'),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () => Navigator.of(context).pop(true),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF263AFF),
                ),
                child: const Text(
                  'Confirm',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          );
        },
      );

      if (shouldBook != true) return;

      // Create the tutoring request
      final tutorRequestService = TutorRequestService();
      await tutorRequestService.createTutoringRequest(
        tutorId: tutor.id!,
        tutorName: tutor.fullName,
        studentEmail: currentUser.email ?? 'No email provided',
        message: 'I would like to book a tutoring session for ${tutor.expertise}.',
      );

      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Booking request sent to ${tutor.fullName}'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error sending booking request: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: LayoutBuilder(
        builder: (context, constraints) {
          if (constraints.maxWidth > 800) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildLeftColumn(context),
                Expanded(child: _buildRightColumn()),
              ],
            );
          } else {
            return Column(
              children: [
                _buildLeftColumn(context),
                _buildRightColumn(),
              ],
            );
          }
        },
      ),
    );
  }

  Widget _buildLeftColumn(BuildContext context) {
    return Container(
      width: 300,
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          CircleAvatar(
            radius: 60,
            backgroundColor: const Color(0xFFD9D9D9),
            backgroundImage: NetworkImage(tutor.imageUrl),
            onBackgroundImageError: (exception, stackTrace) {
              // Fallback icon if image fails to load
              const Icon(Icons.person);
            },
          ),
          const SizedBox(height: 16),
          Text(
            tutor.fullName,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            '${tutor.expertise} | ${tutor.gender}',
            style: const TextStyle(
              color: Colors.black,
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: 150,
            child: ElevatedButton(
              onPressed: () => _bookSession(context),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF263AFF),
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: const Text(
                'Book session',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRightColumn() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSection(
            'About Me',
            Text(
              tutor.aboutMe,
              style: const TextStyle(color: Colors.black),
            ),
          ),
          const SizedBox(height: 32),
          _buildSection(
            'Area of Experience',
            Text(
              tutor.expertise,
              style: TextStyle(color: Colors.grey[600]),
            ),
          ),
          const SizedBox(height: 32),
          _buildSection(
            'Contact Information',
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Email: ${tutor.email}',
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSection(String title, Widget content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: Colors.black,
          ),
        ),
        const SizedBox(height: 16),
        content,
      ],
    );
  }
} 