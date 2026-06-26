import React from 'react';
import { UserCircle } from 'lucide-react';

export default function Noteitem(props) {
  const ab = () => {
    props.handleonclick(props.note);
  };

  return (
    <div className="w-full">
      <div className={`p-4 rounded-lg transition-all duration-200 ${
        props.disable 
          ? 'bg-blue-50 border-2 border-blue-500' 
          : 'bg-white border-2 border-gray-200 hover:border-blue-300'
      }`}>
        <div className="flex items-start space-x-4">
          {/* Candidate Icon */}
          <div className="flex-shrink-0">
            <UserCircle className="w-12 h-12 text-gray-600" />
          </div>

          {/* Candidate Info */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {props.name}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {props.party}
              </span>
            </div>

            {/* Vote Button */}
            <div className="flex justify-end">
              <button
                onClick={ab}
                disabled={props.disable}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1
                  ${props.disable 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  }`}
                type="submit"
              >
                {props.disable ? (
                  'Selected'
                ) : (
                  'Cast Vote'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Selected Indicator */}
        {props.disable && (
          <div className="mt-2 text-sm text-blue-600 flex items-center justify-end">
            ✓ Vote will be cast for this candidate
          </div>
        )}
      </div>
    </div>
  );
}