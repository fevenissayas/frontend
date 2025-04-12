import 'package:cloud_firestore/cloud_firestore.dart';

class TutorRequestService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> createTutoringRequest({
    required String tutorId,
    required String tutorName,
    required String studentEmail,
    required String message,
  }) async {
    try {
      await _firestore.collection('tutoring_requests').add({
        'tutorId': tutorId,
        'tutorName': tutorName,
        'studentEmail': studentEmail,
        'message': message,
        'status': 'PENDING',
        'createdAt': FieldValue.serverTimestamp(),
      });

      // Add to student-tutor relationship collection
      await _firestore.collection('student_tutor_relationships').add({
        'tutorId': tutorId,
        'studentEmail': studentEmail,
        'status': 'PENDING',
        'createdAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      throw Exception('Failed to create tutoring request: $e');
    }
  }

  Stream<QuerySnapshot> getTutorRequests(String tutorId) {
    return _firestore
        .collection('tutoring_requests')
        .where('tutorId', isEqualTo: tutorId)
        .orderBy('createdAt', descending: true)
        .snapshots();
  }

  Stream<QuerySnapshot> getStudentsByTutor(String tutorId) {
    return _firestore
        .collection('student_tutor_relationships')
        .where('tutorId', isEqualTo: tutorId)
        .orderBy('createdAt', descending: true)
        .snapshots();
  }

  Stream<QuerySnapshot> getTutorsByStudent(String studentEmail) {
    return _firestore
        .collection('student_tutor_relationships')
        .where('studentEmail', isEqualTo: studentEmail)
        .orderBy('createdAt', descending: true)
        .snapshots();
  }

  Future<void> updateRequestStatus(String requestId, String status) async {
    try {
      final requestDoc = await _firestore.collection('tutoring_requests').doc(requestId).get();
      final data = requestDoc.data() as Map<String, dynamic>;

      await _firestore.collection('tutoring_requests').doc(requestId).update({
        'status': status,
        'updatedAt': FieldValue.serverTimestamp(),
      });

      // Update status in relationships collection
      final querySnapshot = await _firestore
          .collection('student_tutor_relationships')
          .where('tutorId', isEqualTo: data['tutorId'])
          .where('studentEmail', isEqualTo: data['studentEmail'])
          .get();

      for (var doc in querySnapshot.docs) {
        await doc.reference.update({
          'status': status,
          'updatedAt': FieldValue.serverTimestamp(),
        });
      }
    } catch (e) {
      print('Error updating request status: $e');
      throw e;
    }
  }

  Future<void> deleteRequest(String requestId) async {
    try {
      final requestDoc = await _firestore.collection('tutoring_requests').doc(requestId).get();
      final data = requestDoc.data() as Map<String, dynamic>;

      await _firestore.collection('tutoring_requests').doc(requestId).delete();

      // Delete from relationships collection
      final querySnapshot = await _firestore
          .collection('student_tutor_relationships')
          .where('tutorId', isEqualTo: data['tutorId'])
          .where('studentEmail', isEqualTo: data['studentEmail'])
          .get();

      for (var doc in querySnapshot.docs) {
        await doc.reference.delete();
      }
    } catch (e) {
      print('Error deleting request: $e');
      throw e;
    }
  }
} 