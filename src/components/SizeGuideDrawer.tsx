import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X } from 'lucide-react';

export const SizeGuideDrawer: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const SIZES = [
    { size: 'XXS', us: '00', uk: '2', eu: '30', bustIn: '30-31', waistIn: '23-24', hipIn: '33-34', bustCm: '76-79', waistCm: '58-61', hipCm: '84-86' },
    { size: 'XS', us: '0-2', uk: '4-6', eu: '32-34', bustIn: '32-33', waistIn: '25-26', hipIn: '35-36', bustCm: '81-84', waistCm: '63-66', hipCm: '89-91' },
    { size: 'S', us: '4-6', uk: '8-10', eu: '36-38', bustIn: '34-35', waistIn: '27-28', hipIn: '37-38', bustCm: '86-89', waistCm: '68-71', hipCm: '94-96' },
    { size: 'M', us: '8-10', uk: '12-14', eu: '40-42', bustIn: '36-37', waistIn: '29-30', hipIn: '39-40', bustCm: '91-94', waistCm: '73-76', hipCm: '99-102' },
    { size: 'L', us: '12-14', uk: '16-18', eu: '44-46', bustIn: '38.5-40', waistIn: '31.5-33', hipIn: '41.5-43', bustCm: '98-102', waistCm: '80-84', hipCm: '105-109' },
    { size: 'XL', us: '16', uk: '20', eu: '48', bustIn: '41.5-43', waistIn: '34.5-36', hipIn: '44.5-46', bustCm: '105-109', waistCm: '88-91', hipCm: '113-117' },
    { size: 'XXL', us: '18', uk: '22', eu: '50', bustIn: '44.5-46', waistIn: '37.5-39', hipIn: '47.5-49', bustCm: '113-117', waistCm: '95-99', hipCm: '121-125' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true" aria-label="Size Guide">
      <div
        className="fixed inset-0 bg-[#241019]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-out border-l border-[#fbcfe8]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#fbcfe8] bg-[#fdf2f8]">
            <h2 className="font-mono-typewriter text-sm sm:text-base uppercase font-bold tracking-wide text-[#1f1217]">
              Size Guide // @iconiquebabe
            </h2>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-[#1f1217] hover:text-[#db2777] transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="px-6 py-3 bg-[#fff8fa] border-b border-[#fbcfe8] flex items-center justify-between">
            <span className="font-mono-typewriter text-xs uppercase text-[#4a1829]/70 font-semibold">Measurement Units</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-[#fbcfe8] font-mono-typewriter text-xs">
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer font-bold ${
                  unit === 'in' ? 'bg-[#ec4899] text-white shadow-xs' : 'text-[#db2777]'
                }`}
              >
                Inches
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer font-bold ${
                  unit === 'cm' ? 'bg-[#ec4899] text-white shadow-xs' : 'text-[#db2777]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="border border-[#fbcfe8] overflow-x-auto rounded-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#fdf2f8] text-[#db2777] font-mono-typewriter uppercase border-b border-[#fbcfe8]">
                    <th className="p-2.5 font-bold">Size</th>
                    <th className="p-2.5 font-bold">US</th>
                    <th className="p-2.5 font-bold">UK</th>
                    <th className="p-2.5 font-bold">EU</th>
                    <th className="p-2.5 font-bold">Bust</th>
                    <th className="p-2.5 font-bold">Waist</th>
                    <th className="p-2.5 font-bold">Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#fbcfe8] font-sans-editorial">
                  {SIZES.map((row, idx) => (
                    <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#fff8fa]'}>
                      <td className="p-2.5 font-mono-typewriter font-bold text-[#db2777]">{row.size}</td>
                      <td className="p-2.5 text-[#241019]">{row.us}</td>
                      <td className="p-2.5 text-[#241019]">{row.uk}</td>
                      <td className="p-2.5 text-[#241019]">{row.eu}</td>
                      <td className="p-2.5 text-[#241019]">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                      <td className="p-2.5 text-[#241019]">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td className="p-2.5 text-[#241019]">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mt-8 space-y-4 text-xs text-[#241019]">
              <h4 className="font-mono-typewriter text-xs uppercase font-bold text-[#1f1217] tracking-wider">
                How to Measure Your Silhouette
              </h4>
              <div className="space-y-2 font-sans-editorial leading-relaxed text-[#4a1829]/80">
                <p>
                  <strong className="font-semibold text-[#1f1217]">Bust:</strong> Measure around the fullest part of your chest with tape parallel to the floor.
                </p>
                <p>
                  <strong className="font-semibold text-[#1f1217]">Waist:</strong> Measure around your natural waistline, keeping tape comfortably snug.
                </p>
                <p>
                  <strong className="font-semibold text-[#1f1217]">Hips:</strong> Stand with feet together and measure around the fullest part of your hips.
                </p>
              </div>

              <div className="p-3.5 bg-[#fdf2f8] border border-[#fbcfe8] mt-4 rounded-xs">
                <p className="font-mono-typewriter text-[11px] uppercase text-[#db2777] font-bold">
                  Latex Fitting Note:
                </p>
                <p className="font-sans-editorial text-[11px] text-[#4a1829]/80 mt-1 leading-relaxed">
                  @iconiquebabe Latex pieces are precision tailored with high-stretch natural liquid rubber designed to contour like a second skin. If in between sizes, consider sizing up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

