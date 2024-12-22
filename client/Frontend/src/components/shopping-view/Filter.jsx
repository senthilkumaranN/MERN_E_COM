import { FilterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({ filter, handlefilter }) => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4  border-b'>
                <h2 className='text-lg font-extrabold'>Filters</h2>
            </div>
            <div className='p-4 space-y-4 '>
                {
                    Object.keys(FilterOptions).map(keyItem => <Fragment key={keyItem.id}>
                        <div>
                            <h3 className='text-base font-bold'>{keyItem}</h3>
                            <div className='grid gap-2 mt-2'>
                                {
                                    FilterOptions[keyItem].map(option =>
                                        <Label key={option.id} className="flex items-center gap-2 font-normal">
                                            <Checkbox checked={
                                                filter && Object.keys(filter).length > 0 &&
                                                filter[keyItem] && filter[keyItem].indexOf(option.id) > -1
                                            }
                                                onCheckedChange={() => handlefilter(keyItem, option.id)} />
                                            {option.label}
                                        </Label>)
                                }
                            </div>
                        </div>
                        <Separator />
                    </Fragment>)
                }
            </div>

        </div>
    )
}

export default ProductFilter