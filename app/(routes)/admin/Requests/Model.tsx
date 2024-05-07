import React from 'react';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface CompanyInterface {
  companyName: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  logoUrl: string;
  proofOfOwnershipUrl: string;
  location: string;
  city: string;
  country: string;
  zipCode: string;
  website: string;
}

const Modal_ = ({ company, isOpen, onOpenChange }: { company: CompanyInterface, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{company.companyName}</ModalHeader>
            <ModalBody>
              <div className="relative w-full h-24">
                <Image src={company.logoUrl} alt="Company Logo" layout="fill" objectFit="cover" className="rounded-md" />
              </div>
              <div className="flex items-start gap-4 pt-5">
                <div>
                  <p className="text-lg">{`${company.firstName} ${company.lastName}`}</p>
                  <p className="text-sm">Email: {company.email}</p>
                  <p className="text-sm">CIN: {company.nationalId}</p>
                  <p className="text-sm">Location: {company.location}</p>
                  <p className="text-sm">City: {company.city}</p>
                  <p className="text-sm">Country: {company.country}</p>
                  <p className="text-sm">Zip Code: {company.zipCode}</p>
                  <p className="text-sm">Website: {company.website}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-5">
                <div className='flex flex-col gap-4'>
                  <p className="text-lg">Proof of Ownership</p>
                  <Button color="secondary" onPress={() => window.open(company.proofOfOwnershipUrl, '_blank')}>
                  Download Proof of Ownership
                  </Button>

                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Decline
              </Button>
              <Button color="success" onPress={onClose}>
                Approve
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Modal_;
