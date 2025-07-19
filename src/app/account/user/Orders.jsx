import React from 'react'
import SectionHeader from './SectionHeader'
import emty_box from "@/assets/emty_box.svg"
import Image from 'next/image';

const orders = [];

export default function Orders() {
  return (
    <div>
      <SectionHeader>
        Your Orders
      </SectionHeader>

      <div>
        {orders.length > 0 ? (
          <div>
            OrderList
          </div>
        ) : (
        <div className="text-center mt-20">
          <Image
            src={emty_box}
            alt="No Orders"
            className="mx-auto w-30 mb-3 select-none"
            draggable={false}
          />
          <h3 className="text-gray-600 font-semibold text-lg">You have no orders yet</h3>
        </div>
        )}
      </div>
    </div>
  )
}
