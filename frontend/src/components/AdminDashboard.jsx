import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye, Phone, Mail, MapPin, Calendar, BarChart3, Users, FileText, Filter } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      const url = statusFilter === 'all' 
        ? `${API}/contact/inquiries`
        : `${API}/contact/inquiries?status=${statusFilter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API}/contact/stats`);
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      const response = await fetch(`${API}/contact/inquiry/${inquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-red-100 text-red-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">BlueCheck Inspections</h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {inquiries.length} Total Inquiries
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total_inquiries}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                    <p className="text-3xl font-bold text-red-600">{stats.status_breakdown?.new || 0}</p>
                  </div>
                  <Users className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pre-Purchase</p>
                    <p className="text-3xl font-bold text-green-600">{stats.inspection_type_breakdown?.['pre-purchase'] || 0}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.recent_inquiries_7_days || 0}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Contact Inquiries</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{inquiry.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{inquiry.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{inquiry.property_address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(inquiry.created_at)}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-blue-600">
                          {inquiry.inspection_type.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No inquiries found for the selected filter.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Details */}
          <div>
            {selectedInquiry ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Inquiry Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{selectedInquiry.name}</h3>
                    <Badge className={getStatusColor(selectedInquiry.status)}>
                      {selectedInquiry.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <span className="text-gray-700">{selectedInquiry.property_address}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Inspection Type</p>
                    <p className="text-gray-900">{selectedInquiry.inspection_type.replace('-', ' ').toUpperCase()}</p>
                  </div>

                  {selectedInquiry.preferred_date && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Preferred Date</p>
                      <p className="text-gray-900">{selectedInquiry.preferred_date}</p>
                    </div>
                  )}

                  {selectedInquiry.message && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Message</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded text-sm">{selectedInquiry.message}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Submitted</p>
                    <p className="text-gray-900">{formatDate(selectedInquiry.created_at)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Update Status</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['new', 'contacted', 'scheduled', 'completed', 'cancelled'].map((status) => (
                        <Button
                          key={status}
                          variant={selectedInquiry.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateInquiryStatus(selectedInquiry.id, status)}
                          className="text-xs"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select an inquiry to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;