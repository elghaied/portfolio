import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Laptop, Server, Database, Code, Wrench, Rocket, MoreHorizontal } from 'lucide-react'
import { Service, Technology } from 'src/payload-types'
import Icon from '../DynamicIcon'

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Laptop className="w-6 h-6" />
    case 'backend':
      return <Server className="w-6 h-6" />
    case 'database':
      return <Database className="w-6 h-6" />
    case 'full stack':
      return <Code className="w-6 h-6" />
    case 'devops':
      return <Wrench className="w-6 h-6" />
    case 'performance':
      return <Rocket className="w-6 h-6" />
    default:
      return <MoreHorizontal className="w-6 h-6" />
  }
}

interface ServiceCardProps {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {getCategoryIcon(service.category)}
        {service.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(service.tags) && service.tags.length > 0 ? (
          service.tags.map((tag: Technology) => (
            <Badge key={tag.id} variant="secondary" className='flex items-center gap-1'>
               <Icon name={tag.name} className="w-3 h-3" />
               <span className="text-xs">{tag.name}</span>
            </Badge>
          ))
        ) : (
          null
        )}
      </div>
    </CardContent>
  </Card>
)

interface ServicesSectionProps {
  services: Service[]
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const categories = ['All', ...new Set(services.map((service) => service.category))]

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">My Services</h2>
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((service) => category === 'All' || service.category === category)
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default ServicesSection
