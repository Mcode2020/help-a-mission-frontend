import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Badge, Button, Input } from '../../components/ui';
import { Search, Heart, ArrowRight, Users, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import type { Campaign } from '../../types';

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Healthcare', 'Social Welfare', 'Education', 'Community'];

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50/60 to-white dark:from-slate-900 dark:to-slate-950 py-12 sm:py-16 border-b border-slate-100 dark:border-slate-800">
        <Container className="text-center space-y-4 max-w-3xl">
          <Badge variant="teal">OUR ACTIVE INITIATIVES</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meaningful Causes We Fight For
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Every donation is directly allocated to field operations, medical supplies, education kits, and community sustenance.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search campaigns by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Campaigns Grid */}
      <Container>
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading campaigns...</div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No campaigns found</p>
            <p className="text-sm text-slate-500">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCampaigns.map((camp) => (
              <Card key={camp.id} className="overflow-hidden flex flex-col group hover:shadow-xl">
                {/* Image & Badge */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="teal">{camp.category}</Badge>
                    {camp.isUrgent && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-600 text-white shadow-md">
                        <Sparkles className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                      {camp.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {camp.shortDescription}
                    </p>
                  </div>

                  {/* Progress Meter */}
                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-teal-600 dark:text-teal-400">
                        ₹{camp.raisedAmount.toLocaleString('en-IN')} raised
                      </span>
                      <span className="text-slate-500">
                        Goal: ₹{camp.goalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${camp.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-teal-500" />
                        {camp.donorsCount} Donors Supported
                      </span>
                      <span className="font-bold text-teal-600">{camp.progressPercent}% Funded</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <Link to={`/campaigns/${camp.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <span>Read Story</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>

                    <Link to={`/donate?campaign=${camp.slug}`} className="flex-1">
                      <Button variant="primary" className="w-full">
                        <Heart className="w-4 h-4 mr-1.5 fill-current" />
                        <span>Donate</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CampaignsPage;
