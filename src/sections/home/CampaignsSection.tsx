import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users } from 'lucide-react';
import { Card, Badge, Button } from '../../components/ui';
import { FALLBACK_CAMPAIGNS } from '../../services/api';

export const CampaignsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-teal-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>OUR WORK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Creating Impact Through Dedicated Initiatives
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              We focus our efforts on creating lasting change in the community through medical camps, education support, and direct relief drives.
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/campaigns">
              <Button variant="outline">
                <span>View All Initiatives</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FALLBACK_CAMPAIGNS.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="teal">{item.category}</Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="text-teal-600">₹{item.raisedAmount.toLocaleString('en-IN')}</span>
                    <span className="text-gray-500">Goal: ₹{item.goalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-teal-500" />
                      {item.donorsCount} Donors
                    </span>
                    <span className="font-bold text-teal-600">{item.progressPercent}%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <Link to={`/campaigns/${item.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Details
                    </Button>
                  </Link>
                  <Link to={`/donate?campaign=${item.slug}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full text-xs">
                      <Heart className="w-3.5 h-3.5 mr-1 fill-current" />
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CampaignsSection;
