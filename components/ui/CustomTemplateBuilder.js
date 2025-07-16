import { useState, useEffect } from 'react'
import { promptComponents } from '../../data/prompt-generator-components'

export default function CustomTemplateBuilder({ onTemplateCreated, initialTemplate = null }) {
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const [selectedComponents, setSelectedComponents] = useState([])
  const [templateStructure, setTemplateStructure] = useState('')
  const [previewPrompt, setPreviewPrompt] = useState('')
  const [templateBestFor, setTemplateBestFor] = useState([])
  const [currentBestFor, setCurrentBestFor] = useState('')

  // Initialize with existing template if provided
  useEffect(() => {
    if (initialTemplate) {
      setTemplateName(initialTemplate.name || '')
      setTemplateDescription(initialTemplate.description || '')
      setSelectedComponents(initialTemplate.components || [])
      setTemplateStructure(initialTemplate.template || '')
      setTemplateBestFor(initialTemplate.bestFor || [])
    }
  }, [initialTemplate])

  // Generate template structure when components change
  useEffect(() => {
    if (selectedComponents.length > 0) {
      const structure = generateTemplateStructure(selectedComponents)
      setTemplateStructure(structure)
    }
  }, [selectedComponents])

  // Generate preview when structure changes
  useEffect(() => {
    if (templateStructure) {
      const preview = generatePreview(templateStructure)
      setPreviewPrompt(preview)
    }
  }, [templateStructure])

  const generateTemplateStructure = (components) => {
    let structure = ''
    
    components.forEach((componentId, index) => {
      const component = promptComponents[componentId]
      if (!component) return

      if (component.required) {
        // Required components don't need conditional wrapping
        structure += `# ${component.name}\n{{${componentId}}}\n\n`
      } else {
        // Optional components get conditional wrapping
        structure += `{{#if ${componentId}}}# ${component.name}\n{{${componentId}}}\n\n{{/if}}`
      }
    })

    return structure.trim()
  }

  const generatePreview = (structure) => {
    // Create sample data for preview
    const sampleData = {
      task: 'Write a blog post about sustainable gardening',
      context: 'Target audience is beginner gardeners interested in eco-friendly practices',
      format: 'Write in a friendly, informative tone with actionable tips',
      tone: 'Encouraging and practical',
      audience: 'Beginner gardeners aged 25-45',
      examples: 'Include specific plant recommendations and seasonal advice'
    }

    // Simple template replacement for preview (without Handlebars)
    let preview = structure
    
    // Replace conditionals with content for preview
    preview = preview.replace(/\{\{#if (\w+)\}\}/g, '')
    preview = preview.replace(/\{\{\/if\}\}/g, '')
    
    // Replace variables with sample data
    Object.keys(sampleData).forEach(key => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
      preview = preview.replace(regex, sampleData[key])
    })

    return preview
  }

  const handleComponentToggle = (componentId) => {
    setSelectedComponents(prev => {
      if (prev.includes(componentId)) {
        return prev.filter(id => id !== componentId)
      } else {
        return [...prev, componentId]
      }
    })
  }

  const handleComponentReorder = (dragIndex, hoverIndex) => {
    const newComponents = [...selectedComponents]
    const draggedComponent = newComponents[dragIndex]
    newComponents.splice(dragIndex, 1)
    newComponents.splice(hoverIndex, 0, draggedComponent)
    setSelectedComponents(newComponents)
  }

  const addBestForItem = () => {
    if (currentBestFor.trim() && !templateBestFor.includes(currentBestFor.trim())) {
      setTemplateBestFor([...templateBestFor, currentBestFor.trim()])
      setCurrentBestFor('')
    }
  }

  const removeBestForItem = (item) => {
    setTemplateBestFor(templateBestFor.filter(i => i !== item))
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim() || selectedComponents.length === 0) {
      alert('Please provide a template name and select at least one component.')
      return
    }

    const newTemplate = {
      name: templateName,
      description: templateDescription,
      components: selectedComponents,
      template: templateStructure,
      bestFor: templateBestFor,
      custom: true,
      createdAt: new Date().toISOString()
    }

    onTemplateCreated(newTemplate)
  }

  const availableComponents = Object.values(promptComponents)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-6">Custom Template Builder</h3>

      {/* Template Metadata */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template Name *
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., Business Analysis Template"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={templateDescription}
            onChange={(e) => setTemplateDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            rows="3"
            placeholder="Describe what this template is best used for..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best For (Use Cases)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentBestFor}
              onChange={(e) => setCurrentBestFor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBestForItem()}
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., Market research, Competitive analysis"
            />
            <button
              onClick={addBestForItem}
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {templateBestFor.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {item}
                <button
                  onClick={() => removeBestForItem(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Component Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Select Components</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableComponents.map(component => (
            <div
              key={component.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedComponents.includes(component.id)
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleComponentToggle(component.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">{component.name}</h5>
                  <p className="text-sm text-gray-600">{component.description}</p>
                </div>
                <div className="ml-2">
                  {selectedComponents.includes(component.id) && (
                    <span className="text-yellow-600">✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Components Order */}
      {selectedComponents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Component Order</h4>
          <div className="space-y-2">
            {selectedComponents.map((componentId, index) => {
              const component = promptComponents[componentId]
              return (
                <div
                  key={componentId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                      {index + 1}
                    </span>
                    <span className="font-medium">{component?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => handleComponentReorder(index, index - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ↑
                      </button>
                    )}
                    {index < selectedComponents.length - 1 && (
                      <button
                        onClick={() => handleComponentReorder(index, index + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Template Structure Editor */}
      {templateStructure && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Template Structure</h4>
          <textarea
            value={templateStructure}
            onChange={(e) => setTemplateStructure(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-mono text-sm"
            rows="8"
            placeholder="Template structure will be generated automatically..."
          />
          <p className="text-sm text-gray-600 mt-2">
            You can edit the generated structure. Use <code>{'{{componentId}}'}</code> for variables and <code>{'{{#if componentId}}...{{/if}}'}</code> for optional sections.
          </p>
        </div>
      )}

      {/* Preview */}
      {previewPrompt && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Preview</h4>
          <div className="p-4 bg-gray-50 rounded-lg border">
            <pre className="whitespace-pre-wrap text-sm">{previewPrompt}</pre>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveTemplate}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
        >
          Save Template
        </button>
        <button
          onClick={() => {
            setTemplateName('')
            setTemplateDescription('')
            setSelectedComponents([])
            setTemplateStructure('')
            setTemplateBestFor([])
            setCurrentBestFor('')
          }}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
} 