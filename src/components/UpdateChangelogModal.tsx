import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface UpdateChangelogModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const UpdateChangelogModal: React.FC<UpdateChangelogModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-school-red">Website Updates & Changelog</DialogTitle>
          <DialogDescription>
            Recent changes and improvements to the website.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6 text-sm text-gray-700 max-h-[60vh] overflow-y-auto pr-4">
          <div>
            <h3 className="font-bold text-lg text-school-blue">Update V 1.30:</h3>
            <p className="font-medium text-gray-500 mb-2">Changes Made (13 June 2025):</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Added this update box and pop-up.</li>
              <li>Fixed some animations.</li>
            </ul>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-lg text-school-blue">Update V 1.21:</h3>
            <p className="font-medium text-gray-500 mb-2">Changes Made (13 June 2025):</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Added scroll animation to the Back to Top Button.</li>
              <li>Added a cursor follower.</li>
              <li>Added a fluid background to the About FWS Section.</li>
            </ul>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-lg text-school-blue">Update V 1.20:</h3>
            <p className="font-medium text-gray-500 mb-2">Changes Made (12 June 2025):</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Fixed some images.</li>
              <li>Added glow to some buttons.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateChangelogModal;
