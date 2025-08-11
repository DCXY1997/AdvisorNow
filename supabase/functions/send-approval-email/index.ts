import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApprovalEmailRequest {
  email: string;
  fullName: string;
  representativeCode: string;
  approvalNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, representativeCode, approvalNotes }: ApprovalEmailRequest = await req.json();

    console.log(`Sending approval email to ${email} for ${fullName}`);

    const emailResponse = await resend.emails.send({
      from: "Advisor Now <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Your Advisor Account Has Been Approved!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Advisor Now!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your advisor account has been approved</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #333; margin-top: 0;">Congratulations, ${fullName}!</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              We're excited to inform you that your advisor application has been approved! You can now start helping clients with their financial needs through our platform.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #333; margin-top: 0;">Account Details:</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Representative Code:</strong> ${representativeCode}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${approvalNotes ? `<p style="color: #666; margin: 5px 0;"><strong>Admin Notes:</strong> ${approvalNotes}</p>` : ''}
            </div>
            
            <h3 style="color: #333;">Next Steps:</h3>
            <ol style="color: #666; line-height: 1.8;">
              <li><strong>Verify your email address</strong> - Check your inbox for a verification email</li>
              <li><strong>Complete your profile</strong> - Add your photo, bio, and specializations</li>
              <li><strong>Start connecting with clients</strong> - Begin accepting consultation requests</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${Deno.env.get('SUPABASE_URL') || 'https://your-app-url.com'}/agent-login" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Login to Your Account
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
              If you have any questions, please don't hesitate to contact our support team.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="color: #999; margin: 0; font-size: 14px;">
              © 2024 Advisor Now. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Approval email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-approval-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);