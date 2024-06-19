import { ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps } from "@rjsf/utils";

const CustomObjectFieldTemplate = (props : ObjectFieldTemplateProps) => {
    const { properties, formData } = props;
    console.log(props);

    const updateData = (updatedFormData : any) => {
      // Clear nested selections if parent options are deselected
      const cleanedData = { ...updatedFormData };
  
      if (!updatedFormData.selectedOptions || !updatedFormData.selectedOptions.includes("av2nd")) {
        delete cleanedData.av2nd_options;
      }
  
      if (!updatedFormData.selectedOptions || !updatedFormData.selectedOptions.includes("av3rd")) {
        delete cleanedData.av3rd_options;
      }
  
      if (updatedFormData.av3rd_options && (!updatedFormData.av3rd_options.selectedOptions || !updatedFormData.av3rd_options.selectedOptions.includes("option1"))) {
        delete cleanedData.av3rd_options.option1_details;
      }
  
    //   onChange(cleanedData);
    };
  
    // updateData(formData);

    return (
      <div>
        {properties.map((prop : ObjectFieldTemplatePropertyType) => {
          if (prop.name === "av2nd_options" && (!formData.selectedOptions || !formData.selectedOptions.includes("av2nd"))) {
            return null;
          }
          if (prop.name === "av3rd_options" && (!formData.selectedOptions || !formData.selectedOptions.includes("av3rd"))) {
            return null;
          }
          if (prop.name === "option1_details" && (!formData.selectedOptions || !formData.selectedOptions.includes("option1"))) {
            return null;
          }
          return <div key={prop.name}>{prop.content}</div>;
        })}
      </div>
    );
  };

export default CustomObjectFieldTemplate;