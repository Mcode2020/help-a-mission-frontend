import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, Modal } from '../../components/ui';

import type { CmsGallerySectionContent } from '../../types';

interface GallerySectionProps {
  data?: CmsGallerySectionContent;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ data }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: string | number; img: string; title: string } | null>(null);

  const eyebrow = data?.eyebrow;
  const heading = data?.heading;
  const description = data?.description;
  const viewAllLabel = data?.viewAllLabel;
  const viewAllUrl = data?.viewAllUrl || '/our-work';

  const galleryPhotos = (data?.images || []).map((item, idx) => ({
    id: item.id || String(idx + 1),
    img: item.url || '',
    title: item.title || item.alt || '',
  }));

  return (
    <section className="py-[60px] md:py-[100px] bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-[80px]">
        {/* Header with Top-Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[48px] gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* Category Pill with Horizontal Line */}
            {eyebrow && (
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-[2.5px] bg-[#08A49C] rounded-full"></span>
                <span className="text-[#08A49C] text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {eyebrow}
                </span>
              </div>
            )}

            {heading && (
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-slate-500 text-sm sm:text-base mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {viewAllLabel && (
            <div className="shrink-0">
              <Link to={viewAllUrl}>
                <Button
                  variant="primary"
                  className="rounded-full font-semibold px-6 py-3 text-xs sm:text-sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {viewAllLabel}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* 3x3 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative h-60 sm:h-64 md:h-72 rounded-[20px] overflow-hidden shadow-sm border border-slate-100 cursor-pointer"
            >
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
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

