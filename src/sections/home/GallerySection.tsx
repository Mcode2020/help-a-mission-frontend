import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal } from '../../components/ui';
import { Eye, ArrowRight } from 'lucide-react';

import campaignBlood from '../../assets/campaign_blood.jpg';
import campaignFinancial from '../../assets/campaign_financial.jpg';
import campaignEducation from '../../assets/campaign_education.jpg';
import campaignCommunity from '../../assets/campaign_community.jpg';
import heroBg from '../../assets/hero_bg.jpg';
import aboutImg from '../../assets/about_img.jpg';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; img: string; title: string } | null>(null);

  const galleryPhotos = [
    { id: 1, img: heroBg, title: 'Team Meeting & Event Setup in Jind' },
    { id: 2, img: campaignFinancial, title: 'Financial Aid Grant Distribution' },
    { id: 3, img: campaignCommunity, title: 'Community Welfare & Blanket Distribution' },
    { id: 4, img: campaignEducation, title: 'Child Education Stationery Kits Drive' },
    { id: 5, img: campaignBlood, title: 'Blood Donation Camp Organizing Team' },
    { id: 6, img: aboutImg, title: 'Social Welfare & Health Awareness Camp' },
    { id: 7, img: heroBg, title: 'Volunteer Orientation & Field Planning' },
    { id: 8, img: campaignFinancial, title: 'Medical Assistance Cheque Handover' },
    { id: 9, img: campaignCommunity, title: 'Public Felicitation & Relief Ceremony' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Top-Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-teal-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="w-8 h-[2px] bg-teal-600"></span>
              <span>OUR GALLERY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Moments That Inspire Hope
            </h2>

            <p className="text-gray-600 text-base sm:text-lg">
              A glimpse of our community work, blood donation drives, and celebrations across Jind district.
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/campaigns">
              <Button variant="outline">
                <span>View All Campaigns</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3x3 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <Card
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover Dark Overlay with Icon & Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase mb-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>
                <h4 className="font-bold text-base leading-snug">{photo.title}</h4>
              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          isOpen={Boolean(selectedPhoto)}
          onClose={() => setSelectedPhoto(null)}
          title={selectedPhoto.title}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Help-A-Mission Welfare Society JIND</span>
              <Button size="sm" variant="outline" onClick={() => setSelectedPhoto(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default GallerySection;
